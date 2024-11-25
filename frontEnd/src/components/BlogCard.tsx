import { Link } from "react-router-dom";

interface BlogCardProps {
    title: string;
    content: string;
    authorId: string;
    imageUrl: string;
    id: string;
}

const tags = ["AI", "Development", "Web", "JAVA"];

const BlogCard = ({ title, content, id }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`} className="group">
            <article
                key={id}
                className="rounded-lg p-3 mb-8 border border-darkMuted group-hover:border-darkBackground dark:group-hover:border-background transition-none"
            >
                <h2 className="text-xl text-primary dark:text-darkPrimary mb-2 group-hover:underline underline-offset-4">
                    {title}
                </h2>
                <p className="text-textMain dark:text-darkTextMain mb-4 text-sm line-clamp-2">
                    {content}
                </p>
                <div className="flex flex-wrap items-center text-xs text-muted dark:text-darkMuted justify-between">
                    <div className="my-2">
                        <span>{"May 2 2024"}</span>
                        <span className="mx-2">·</span>
                        <span className="mr-4">{"5 min"}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 my-2">
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                className="bg-accentBackground dark:bg-darkAccentBackground rounded-full px-3 py-1 text-xs text-accentText dark:text-darkAccentText"
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default BlogCard;
