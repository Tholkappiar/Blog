import { Hono } from "hono";
import { userRoute } from "./Routes/userRoutes";
import { blogRoute } from "./Routes/blogRoutes";
import { authMiddleware } from "./middleware/authMiddleware";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
    "/api/*",
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.get("/", (c) => {
    return c.json({
        message: "Hello World!",
    });
});

// app.use("/api/v1/blog/*", authMiddleware);
app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
