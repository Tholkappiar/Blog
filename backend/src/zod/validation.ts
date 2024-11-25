import z from "zod";

export const signinInputSchema = z.object({
    email: z.string().email({ message: "Invalid Email." }),
    password: z.string().min(8).max(15, { message: "Invalid Password" }),
});
export type signinInput = z.infer<typeof signinInputSchema>;

export const signupInputSchema = z.object({
    name: z.string().min(3).max(15, { message: "Invalid UserName" }),
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(8).max(15, { message: "Invalid Password" }),
});
export type signupInput = z.infer<typeof signupInputSchema>;

const titleSchema = z.string({ message: "Title must be a string" });
const postSchema = z.string({
    message: "Post must be string.",
});
const tagsSchema = z
    .array(z.string())
    .min(1, { message: "At least 1 tag is required" })
    .max(5, { message: "A maximum of 5 tags are allowed" });

const excerpt = z.string({ message: "Excerpt must be a string" });

export const createPostInputSchema = z.object({
    title: titleSchema,
    post: postSchema,
    tags: tagsSchema,
    excerpt: excerpt,
});

export const updatePostInputSchema = z.object({
    title: titleSchema.optional(),
    post: postSchema.optional(),
    tags: tagsSchema.optional(),
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;
export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;
