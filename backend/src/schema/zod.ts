import { string, z } from "zod";

export const signupSchema = z.object({
    name: string().min(4).max(25, {
        message: "Name should be in the length of minimun 4 and maximum 25",
    }),
    email: string()
        .email()
        .max(30, { message: "Email should be the size of 30" }),
    password: string().min(8).max(12, {
        message: "Password should be the size of minimun 8 and maximum 12",
    }),
});

export const loginSchema = z.object({
    email: string()
        .email()
        .max(30, { message: "Email should be the size of 30" }),
    password: string().min(8).max(12, {
        message: "Password should be the size of minimun 8 and maximum 12",
    }),
});

export const blogSchema = z.object({
    title: string().min(10, {
        message: "Title must be atleast 10 characters long",
    }),
    content: string().min(20, {
        message: "Content must be atleast 20 characters long",
    }),
});
