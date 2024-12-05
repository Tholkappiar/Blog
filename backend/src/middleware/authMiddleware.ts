import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { HttpStatus } from "../utils/utils";
import { getPrismaClient } from "../utils/PrismaSingleton";

export async function authMiddleware(c: Context, next: Next) {
    const SECRET_KEY = c.env.SECRET_KEY;
    const authorization = c.req.header("Authorization");
    const jwt = authorization && authorization.split(" ")[1];
    if (!jwt)
        return c.json(
            {
                message: "Invalid Authorization format",
            },
            HttpStatus.UNAUTHORIZED
        );
    try {
        const jwtVerify = await verify(jwt, SECRET_KEY);
        if (!jwtVerify)
            return c.json(
                {
                    message: "UnAuthorized request",
                },
                HttpStatus.UNAUTHORIZED
            );
        c.set("userId", jwtVerify.userId);
        await next();
    } catch (e) {
        return c.json(
            {
                message: "Invalid or Expired Token",
            },
            HttpStatus.UNAUTHORIZED
        );
    }
}

export async function setId(c: Context, next: Next) {
    const SECRET_KEY = c.env.SECRET_KEY;
    const authorization = c.req.header("Authorization");
    const jwt = authorization && authorization.split(" ")[1];
    if (jwt) {
        try {
            const jwtVerify = await verify(jwt, SECRET_KEY);
            if (!jwtVerify) {
                return c.json(
                    {
                        message: "Unauthorized request",
                    },
                    HttpStatus.UNAUTHORIZED
                );
            }
            c.set("userId", jwtVerify.userId);
        } catch (e) {
            return c.json(
                {
                    message: "Invalid or Expired Token",
                },
                HttpStatus.UNAUTHORIZED
            );
        }
    }
    await next();
}

export async function authorizePostAccess(c: Context, next: Next) {
    const userId = c.get("userId");
    const id = c.req.param("id");

    const prisma = getPrismaClient(c.env.DATABASE_URL);
    if (!prisma) {
        return c.json(
            {
                message: "Failed to initialize the Prisma client.",
            },
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    if (!userId)
        return c.json(
            {
                message: "User id required",
            },
            HttpStatus.NOT_FOUND
        );

    if (!id)
        return c.json(
            {
                message: "Blog id required",
            },
            HttpStatus.NOT_FOUND
        );

    // Fetch the post to check the authorId
    const post = await prisma.post.findUnique({
        where: { id },
        select: { authorId: true },
    });

    if (!post) {
        return c.json({ message: "Post not found" }, HttpStatus.NOT_FOUND);
    }

    // Check if the authorId matches the userId
    if (post.authorId !== userId) {
        return c.json({ message: "Unauthorized access" }, HttpStatus.FORBIDDEN);
    }

    await next();
}
