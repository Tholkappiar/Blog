import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { BlogCardShimmer } from "../components/BlogShimmerEffects";
import { API_ROUTES } from "../utils/apiEndpoints";
import useAuth from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import useAxiosInstance from "@/hooks/useAxiosInstance";

interface Blog {
    title: string;
    post: string;
    authorId: string;
    excerpt: string;
    tags: string[];
    id: string;
    published: boolean;
    filterBlog: (id: string) => void;
    createdAt: string;
    views: number;
}

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { user } = useAuth();
    const location = useLocation();
    const axiosInstanceToUse = useAxiosInstance();
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const requestURL =
                    location.pathname === "/myBlogs"
                        ? API_ROUTES.BLOG.GET_MY_BLOGS
                        : API_ROUTES.BLOG.GET_ALL_BLOGS;

                const response = await axiosInstanceToUse.get(requestURL);
                if (!response) {
                    throw new Error("Failed to fetch blogs");
                }
                const data = response.data?.blogs;
                setBlogs(data);
            } catch (err: unknown) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [user.token]);

    const filterBlog = (id: string) => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    };

    if (error) {
        return (
            <div className="text-center text-foreground">Error: {error}</div>
        );
    }

    return (
        <div className="w-full max-w-4xl 3xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2 select-none">
                {"<ThBlog />"}
            </h1>
            <p className="text-sm xl:text-base text-center mb-10 text-muted-foreground select-none">
                think . write . share
            </p>

            {loading ? (
                <BlogCardShimmer />
            ) : blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        title={blog.title}
                        post={blog.post}
                        excerpt={blog.excerpt}
                        published={blog.published}
                        tags={blog.tags}
                        authorId={blog.authorId}
                        id={blog.id}
                        filterBlog={filterBlog}
                        dateTime={blog.createdAt}
                        currentUserId={user.userId}
                        views={blog?.views}
                    />
                ))
            ) : (
                <div className="text-center text-muted-foreground">
                    No blogs available at the moment.
                </div>
            )}
        </div>
    );
};

export default Blogs;
