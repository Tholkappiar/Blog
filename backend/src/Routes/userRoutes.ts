import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInputSchema, signupInputSchema } from "@tholkappiar/common";
import {
    ACCESS_TOKEN_EXPIRATION,
    HttpStatus,
    REFRESH_TOKEN_EXPIRATION,
} from "../utils/utils";
import { getCookie, setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";

export const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    };
}>();

userRoute.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const { name, email, password } = await c.req.json();
        const validation = signupInputSchema.safeParse({
            name,
            email,
            password,
        });

        if (!validation.success) {
            return c.json(
                {
                    message: validation.error.errors[0].message,
                },
                HttpStatus.BAD_REQUEST
            );
        }

        const registeredUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (registeredUser) {
            return c.json(
                {
                    message: "User Already exists!",
                },
                HttpStatus.CONFLICT
            );
        }

        const hashedPassword = await bcrypt.hash(password, 9);
        const response = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        if (!response) {
            return c.json(
                {
                    message: "Can't create Account",
                },
                HttpStatus.BAD_REQUEST
            );
        }

        const accessToken = await generateToken(
            { userId: response.id },
            c.env.SECRET_KEY,
            "access"
        );
        const refreshToken = await generateToken(
            { userId: response.id },
            c.env.SECRET_KEY,
            "refresh"
        );

        setCookie(c, "refresh", refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: REFRESH_TOKEN_EXPIRATION,
        });

        return c.json(
            {
                token: accessToken,
            },
            HttpStatus.CREATED
        );
    } catch (e) {
        console.error(e);
        return c.json(
            {
                message: "Something went wrong while creating the account",
            },
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
});

userRoute.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const { email, password } = await c.req.json();
        const validation = signinInputSchema.safeParse({
            email,
            password,
        });

        // Handle validation errors
        if (!validation.success) {
            return c.json(
                {
                    message: validation.error.errors[0].message,
                },
                HttpStatus.BAD_REQUEST
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return c.json(
                {
                    message: "User not Found",
                },
                HttpStatus.NOT_FOUND
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return c.json(
                { message: "Invalid credentials" },
                HttpStatus.UNAUTHORIZED
            );
        }

        const accessToken = await generateToken(
            { userId: user.id },
            c.env.SECRET_KEY,
            "access"
        );
        const refreshToken = await generateToken(
            { userId: user.id },
            c.env.SECRET_KEY,
            "refresh"
        );

        setCookie(c, "refresh", refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: REFRESH_TOKEN_EXPIRATION,
        });

        return c.json(
            {
                token: accessToken,
            },
            HttpStatus.OK
        );
    } catch (e) {
        console.error(e);
        return c.json(
            {
                message: "Could not sign in.",
            },
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
});

userRoute.get("/refresh_token", async (c) => {
    const refreshToken = getCookie(c, "refresh");
    if (!refreshToken) {
        return c.json(
            { message: "Refresh token is missing." },
            HttpStatus.UNAUTHORIZED
        );
    }

    try {
        const payload = await verifyToken(refreshToken, c.env.SECRET_KEY);

        if (!payload) {
            return c.json(
                { message: "Invalid refresh token." },
                HttpStatus.UNAUTHORIZED
            );
        }

        const token = await generateToken(
            { userId: payload.userId },
            c.env.SECRET_KEY,
            "access"
        );

        return c.json({ token }, HttpStatus.OK);
    } catch (e) {
        console.error(e);
        return c.json(
            { message: "Could not refresh token." },
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
});

// Function to generate the Access Token and Refresh Token
async function generateToken(
    payload: Record<string, any>,
    SECRET_KEY: string,
    token: "access" | "refresh"
) {
    const TOKEN_EXPIRATION =
        token === "access" ? ACCESS_TOKEN_EXPIRATION : REFRESH_TOKEN_EXPIRATION;

    const tokenPayload = {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION,
    };

    return await sign(tokenPayload, SECRET_KEY);
}

function verifyToken(token: string, SECRET_KEY: string) {
    try {
        return verify(token, SECRET_KEY);
    } catch {
        return null;
    }
}
