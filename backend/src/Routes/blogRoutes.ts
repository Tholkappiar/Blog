import { Context, Hono, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { HttpStatus } from "../utils/utils";
import { authorizePostAccess, setId } from "../middleware/authMiddleware";
import {
    createPostInputSchema,
    updatePostInputSchema,
} from "../zod/validation";

export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY: string;
    };
    Variables: {
        userId: string;
    };
}>();

blogRoute.use(setId);

blogRoute
    .post("/", async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const { title, post, tags, excerpt } = await c.req.json();
        const id = c.get("userId");

        // Validate input schema
        const validation = createPostInputSchema.safeParse({
            title,
            post,
            tags,
            excerpt,
        });
        if (!validation.success) {
            return c.json(
                {
                    message: validation.error.errors[0].message,
                },
                HttpStatus.BAD_REQUEST
            );
        }

        await prisma.post.create({
            data: {
                title,
                post,
                tags,
                excerpt,
                authorId: id,
            },
        });

        return c.json(
            {
                message: "Post created",
            },
            HttpStatus.CREATED
        );
    })
    .put("/", authorizePostAccess, async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const { id, title, post, tags } = body;

        // Validate ID
        if (!(await validatePostId(c, id))) {
            return c.json(
                {
                    message: "Post not found.",
                },
                HttpStatus.NOT_FOUND
            );
        }

        // Validate input schema
        const validation = updatePostInputSchema.safeParse({
            title,
            post,
            tags,
        });
        if (!validation.success) {
            return c.json(
                {
                    message: validation.error.errors[0].message,
                },
                HttpStatus.BAD_REQUEST
            );
        }

        await prisma.post.update({
            where: { id },
            data: { title, post, tags },
        });

        return c.json({
            message: "Blog updated successfully",
        });
    })
    .get("/getAllBlogs", async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        // const { userId: requestedUserId } = await c.req.json();

        // If no userId is provided, fall back to the authenticated user's userId
        // const userId = requestedUserId || c.get("userId");

        const blogs = await prisma.post.findMany({});

        if (!blogs.length) {
            return c.json(
                {
                    message: "No blogs available.",
                },
                HttpStatus.NOT_FOUND
            );
        }

        return c.json({
            blogs,
        });
    })
    .get("/:id", async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogId = c.req.param("id");

        // Validate ID
        if (!(await validatePostId(c, blogId))) {
            return c.json(
                {
                    message: "No blog found.",
                },
                HttpStatus.NOT_FOUND
            );
        }

        const blog = await prisma.post.findUnique({
            where: { id: blogId },
        });

        return c.json({
            blog,
        });
    })
    .delete("/:id", authorizePostAccess, async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogId = c.req.param("id");
        // Validate ID
        if (!(await validatePostId(c, blogId))) {
            return c.json(
                {
                    message: "Post not found.",
                },
                HttpStatus.NOT_FOUND
            );
        }

        // Delete the post
        await prisma.post.delete({
            where: { id: blogId },
        });

        return c.json({
            message: "Post deleted successfully",
        });
    });

// Function to validate post ID
async function validatePostId(c: Context, postId: string) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    return post ? true : false;
}
