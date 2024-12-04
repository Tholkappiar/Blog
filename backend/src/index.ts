import { Hono } from "hono";
import { userRoute } from "./Routes/userRoutes";
import { blogRoute } from "./Routes/blogRoutes";
import { cors } from "hono/cors";
import { cloudflareRateLimiter } from "@hono-rate-limiter/cloudflare";

type AppType = {
    Bindings: {
        RATE_LIMITER: RateLimit;
    };
};

const app = new Hono<AppType>();

app.use(
    "/api/*",
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(
    cloudflareRateLimiter<AppType>({
        rateLimitBinding: (c) => c.env.RATE_LIMITER, // Reference to RATE_LIMITER
        keyGenerator: (c) => c.req.header("cf-connecting-ip") || "unknown", // Use IP for unique identification
    })
);

app.get("/", (c) => {
    return c.json({
        message: "Hello World!",
    });
});

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
