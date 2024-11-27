import { Link } from "react-router-dom";
import { BlogCardDropDown } from "./DropDown";

interface BlogCardProps {
    title: string;
    excerpt: string;
    content: string;
    authorId: string;
    id: string;
    tags: string[];
    deleteBlog: (id: string) => void;
}

const BlogCard = ({ title, id, excerpt, tags, deleteBlog }: BlogCardProps) => {
    return (
        <div className="group">
            <article
                key={id}
                className="rounded-lg p-3 mb-8 border border-border transition-none relative group-hover:border-card-foreground"
            >
                <Link to={`/blog/${id}`}>
                    <h2 className="text-xl w-11/12 text-foreground mb-2 group-hover:underline underline-offset-4">
                        {title}
                    </h2>

                    <p className="text-secondary-foreground mb-4 text-sm line-clamp-2">
                        {excerpt}
                    </p>
                    <div className="flex flex-wrap items-center text-xs text-foreground justify-between">
                        <div className="my-2">
                            <span className="text-muted-foreground">
                                {"May 2 2024"}
                            </span>
                            <span className="mx-2 text-muted-foreground">
                                ·
                            </span>
                            <span className="mr-4 text-muted-foreground">
                                {"5 min"}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 my-2">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="bg-muted rounded-full px-3 py-1 text-xs text-muted-foreground"
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </Link>
                <div className="absolute top-3 right-3">
                    <BlogCardDropDown id={id} deleteBlog={deleteBlog} />
                </div>
            </article>
        </div>
    );
};

export default BlogCard;
