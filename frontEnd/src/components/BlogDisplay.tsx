const BlogDisplay = ({
    title,
    post,
}: {
    title: string | undefined;
    post: string | undefined;
}) => {
    return (
        <div className="lg:w-2/3 sm:p-4 py-8">
            <div className="text-2xl sm:text-4xl font-bold text-primary dark:text-darkPrimary">
                {title}
            </div>
            <p className="my-4 text-muted text-sm sm:text-lg dark:text-darkMuted">
                Posted on {"Sept 12 2024"}
            </p>
            <div className="mt-2 w-10/12 leading-7 tracking-wide text-textMain dark:text-darkTextMain">
                {post}
            </div>
        </div>
    );
};

export default BlogDisplay;
