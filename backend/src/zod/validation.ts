import z from "zod";

export const signinInputSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(15, { message: "Password cannot exceed 15 characters." }),
});
export type signinInput = z.infer<typeof signinInputSchema>;

export const signupInputSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long." })
        .max(15, { message: "Name cannot exceed 15 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(15, { message: "Password cannot exceed 15 characters." }),
    passkey: z.string({ message: "Passkey is required." }),
});
export type signupInput = z.infer<typeof signupInputSchema>;

const titleSchema = z.string({
    message: "Title is required and must be a valid string.",
});
const postSchema = z.string({
    message: "Post content is required and must be a valid string.",
});
const tagsSchema = z
    .array(z.string())
    .min(1, { message: "Please provide at least one tag." })
    .max(5, { message: "You can only add up to 5 tags." });

const excerptSchema = z.string({
    message: "Excerpt is required and must be a valid string.",
});
export const createPostInputSchema = z.object({
    title: titleSchema,
    post: postSchema,
    tags: tagsSchema,
    excerpt: excerptSchema,
});

export const updatePostInputSchema = z.object({
    title: titleSchema.optional(),
    post: postSchema.optional(),
    tags: tagsSchema.optional(),
    excerpt: excerptSchema.optional(),
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;
export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;
