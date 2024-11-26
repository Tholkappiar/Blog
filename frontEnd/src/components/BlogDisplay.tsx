import BlogRender from "../pages/BlogRender";

const BlogDisplay = ({
    title,
    post,
}: {
    title: string | undefined;
    post: string | undefined;
}) => {
    return (
        <div className="sm:p-4 py-8 font-mono">
            <div className="text-2xl sm:text-3xl font-semibold text-primary dark:text-darkPrimary">
                {title}
            </div>
            <p className="my-2 text-muted text-xs sm:text-base dark:text-darkMuted">
                Posted on {"Sept 12 2024"}
            </p>
            <div className="mt-10">
                <BlogRender post={post || ""} />
            </div>
        </div>
    );
};

export default BlogDisplay;
