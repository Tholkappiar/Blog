import { Context, Hono, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { HttpStatus } from "../utils/utils";
import {
    authMiddleware,
    authorizePostAccess,
    setId,
} from "../middleware/authMiddleware";
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

blogRoute
    .post("/", authMiddleware, async (c) => {
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
                createdAt: new Date(),
            },
        });

        return c.json(
            {
                message: "Post created",
            },
            HttpStatus.CREATED
        );
    })
    .put("/:id", authMiddleware, authorizePostAccess, async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const id = c.req.param("id");
        const { title, post, tags, excerpt } = body;

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

        await prisma.post.update({
            where: { id },
            data: { title, post, tags, excerpt },
        });

        return c.json({
            message: "Blog updated successfully",
        });
    })
    .get("/getAllBlogs", setId, async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const userId = c.get("userId");
        const blogs = await prisma.post.findMany({
            where: {
                published: true,
            },
        });

        if (blogs.length === 0) {
            return c.json({ blogs: [] }, HttpStatus.OK);
        }

        if (userId) {
            return c.json({
                blogs,
            });
        }
        const blogsWithoutViews = blogs.map((blog) => {
            const { views, ...blogWithoutViews } = blog;
            return blogWithoutViews;
        });

        return c.json({
            blogs: blogsWithoutViews,
        });
    })
    .get("/getMyBlogs", authMiddleware, async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const userId = c.get("userId");
        let blogs;
        if (!userId) {
            return c.json(
                { message: "No User id provided." },
                HttpStatus.UNAUTHORIZED
            );
        }
        blogs = await prisma.post.findMany({
            where: {
                authorId: userId,
            },
        });
        return c.json({
            blogs,
        });
    })
    .get("/:id", setId, async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogId = c.req.param("id");
        const userId = c.get("userId");

        // Validate ID
        if (!validatePostId(c, blogId)) {
            return c.json(
                {
                    message: "No blog found.",
                },
                HttpStatus.NOT_FOUND
            );
        }
        let blog;
        if (!userId) {
            blog = await prisma.post.findUnique({
                where: { id: blogId, published: true },
            });
        } else {
            blog = await prisma.post.findUnique({
                where: { id: blogId },
            });
            if (blog && !blog.published && blog.authorId !== userId) {
                return c.json(
                    {
                        message:
                            "You do not have permission to view this private blog.",
                    },
                    HttpStatus.FORBIDDEN
                );
            }
        }
        try {
            async function incrementViewCount(postId: string) {
                console.log(postId);
                const post = await prisma.post.findUnique({
                    where: { id: postId },
                });
                if (!post) {
                    throw new Error("Post not found");
                }

                const updatedPost = await prisma.post.update({
                    where: { id: postId },
                    data: {
                        views: post.views + 1,
                    },
                });

                return updatedPost;
            }

            await incrementViewCount(blogId);
            const responseBlog = userId ? blog : { ...blog, views: undefined };
            return c.json({
                blog: responseBlog,
            });
        } catch (error) {
            return c.json(
                {
                    message: "Error while updating the view count.",
                },
                500
            );
        }
    })
    .delete("/:id", authMiddleware, authorizePostAccess, async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogId = c.req.param("id");
        // Validate ID
        if (!validatePostId(c, blogId)) {
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
    })
    .post("/:id", authMiddleware, authorizePostAccess, async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const blogId = c.req.param("id");
        try {
            const blog = await prisma.post.findUnique({
                where: {
                    id: blogId,
                },
            });
            if (!blog) {
                return c.json(
                    { message: "Post not found" },
                    HttpStatus.NOT_FOUND
                );
            }
            const updatedPost = await prisma.post.update({
                where: {
                    id: blogId,
                },
                data: {
                    published: !blog.published,
                },
            });
            return c.json(
                {
                    message: `Post ${
                        updatedPost.published ? "published" : "unpublished"
                    }`,
                    post: updatedPost,
                },
                HttpStatus.OK
            );
        } catch (error) {
            console.error(error);
            return c.json(
                { message: "Something went wrong while toggling post status." },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
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
