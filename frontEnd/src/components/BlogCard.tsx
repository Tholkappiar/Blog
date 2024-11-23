import { Link } from "react-router-dom";

interface BlogCardProps {
    title: string;
    content: string;
    authorId: string;
    imageUrl: string;
    id: string;
}

const tags = ["AI", "Development", "Web", "JAVA"];

const BlogCard = ({ title, content, authorId, id }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <article
                key={id}
                className="bg-card dark:bg-darkCard shadow rounded-lg p-6 mb-8"
            >
                <h2 className="text-2xl font-bold text-primary dark:text-darkPrimary mb-2">
                    {title}
                </h2>
                <p className="text-textMain dark:text-darkTextMain mb-4">
                    {content}
                </p>
                <div className="flex items-center text-sm text-muted dark:text-darkMuted">
                    <span>{authorId.slice(authorId.length / 2)}</span>
                    <span className="mx-2">·</span>
                    <span>{"May 2 2024"}</span>
                    <span className="mx-2">·</span>
                    <span>{"5 min"}</span>
                </div>
                <div className="mt-4 flex flex-wrap">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-accentBackground dark:bg-darkAccentBackground rounded-full px-3 py-1 text-sm font-semibold text-accentText dark:text-darkAccentText mr-2 mb-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </article>
        </Link>
    );
};

export default BlogCard;
