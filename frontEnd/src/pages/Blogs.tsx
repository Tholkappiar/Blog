import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { BlogCardShimmer } from "../components/BlogShimmerEffects";
import { API_ROUTES } from "../utils/apiEndpoints";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface Blog {
    title: string;
    post: string;
    authorId: string;
    excerpt: string;
    tags: string[];
    id: string;
    deleteBlog: (id: string) => void;
}

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axiosPrivate.get(
                    API_ROUTES.BLOG.GET_ALL_BLOGS
                );
                if (!response) {
                    throw new Error("Failed to fetch blogs");
                }
                const data = response.data.blogs;
                setBlogs(data);
            } catch (err: unknown) {
                setError((err as Error).message);
            }
        };

        fetchBlogs();
    }, []);

    const deleteBlog = (id: string) => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    };

    if (error) {
        return (
            <div className="text-center text-destructive-foreground">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl 3xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono">
            <h1 className="text-3xl font-bold text-center text-foreground mb-2">
                {"<ThBlog />"}
            </h1>
            <p className="text-center mb-10 text-muted-foreground">
                think . write . share
            </p>
            {blogs.length ? (
                blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        title={blog.title}
                        excerpt={blog.excerpt}
                        tags={blog.tags}
                        authorId={blog.authorId}
                        id={blog.id}
                        deleteBlog={deleteBlog}
                    />
                ))
            ) : (
                <BlogCardShimmer />
            )}
        </div>
    );
};

export default Blogs;
