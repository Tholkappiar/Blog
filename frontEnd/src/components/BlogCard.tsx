import { Link } from "react-router-dom";
import { BlogCardDropDown } from "./BlogDropDown";
import { format } from "date-fns";
import { extractTextFromJSON, getReadingTime } from "@/utils/blogUtils";
import useAuth from "@/hooks/useAuth";
import { memo } from "react";

interface BlogCardProps {
    title: string;
    excerpt: string;
    post: string;
    authorId: string;
    id: string;
    tags: string[];
    filterBlog: (id: string) => void;
    dateTime: string;
    published: boolean;
    currentUserId: string | undefined;
    views: number;
}

const BlogCard = ({
    title,
    id,
    excerpt,
    tags,
    dateTime,
    post,
    published,
    filterBlog,
    currentUserId,
    authorId,
    views,
}: BlogCardProps) => {
    const extractedText = extractTextFromJSON(post);
    const readingTime = getReadingTime(extractedText);

    const { user } = useAuth();

    return (
        <div className="group">
            <article
                key={id}
                className="rounded-lg p-3 mb-8 border border-gray-300 dark:border-gray-500 transition-none relative group-hover:border-card-foreground"
            >
                <Link to={`/blog/${id}`} className="transition-colors">
                    <h2 className="text-lg md:text-xl w-11/12 text-foreground mb-2 group-hover:underline underline-offset-4">
                        {title}
                    </h2>

                    <p className="text-secondary-foreground mb-4 text-sm md:text-base line-clamp-2">
                        {excerpt}
                    </p>
                    <div className="flex flex-wrap items-center text-xs text-foreground justify-between">
                        <div className="my-2">
                            <span className="text-muted-foreground">
                                {format(new Date(dateTime), "MMM d, yyyy")}
                            </span>
                            <span className="mx-2 text-muted-foreground">
                                ·
                            </span>
                            <span className="mr-4 text-muted-foreground">
                                {readingTime}
                            </span>

                            {user.userId && (
                                <>
                                    <span className="mx-2 text-muted-foreground">
                                        ·
                                    </span>
                                    <span className="mr-4 text-muted-foreground">
                                        {views} views
                                    </span>
                                </>
                            )}
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
                {user.token && currentUserId === authorId && (
                    <div className="absolute top-3 right-3">
                        <BlogCardDropDown
                            id={id}
                            filterBlog={filterBlog}
                            published={published}
                        />
                    </div>
                )}
            </article>
        </div>
    );
};

export default memo(BlogCard);
