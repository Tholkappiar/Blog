import { format } from "date-fns";
import BlogRender from "../pages/BlogRender";

const BlogDisplay = ({
    title,
    post,
    createdAt,
}: {
    title: string | undefined;
    post: string | undefined;
    createdAt: string | undefined;
}) => {
    return (
        <div className="sm:p-4 py-8 mt-8 font-mono">
            <div className="text-2xl sm:text-3xl font-semibold text-foreground">
                {title || "Untitled"}
            </div>
            <p className="my-2 text-muted-foreground text-xs sm:text-base">
                Posted on{" "}
                {createdAt ? format(new Date(createdAt), "MMM d, yyyy") : ""}
            </p>
            <div className="mt-10">
                <BlogRender post={post || ""} />
            </div>
        </div>
    );
};

export default BlogDisplay;
