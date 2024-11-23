import { useEffect, useState } from "react";
import RecommendedTags from "../components/RecommendedTags";
import BlogCard from "../components/BlogCard";
import {
    BlogCardShimmer,
    RecommendedTagsShimmer,
} from "../components/BlogShimmerEffects";
import { API_ROUTES } from "../utils/apiEndpoints";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface Blog {
    title: string;
    post: string;
    authorId: string;
    imageUrl: string;
    tags: string[];
    id: string;
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

    if (error) {
        return (
            <div className="text-center text-error dark:text-error-dark">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3 lg:pr-8">
                    <h1 className="text-3xl font-bold text-primary dark:text-white mb-8">
                        Latest Blog Posts
                    </h1>
                    {blogs.length ? (
                        blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                title={blog.title}
                                content={blog.post}
                                imageUrl={"blog.imageUrl"}
                                authorId={blog.authorId}
                                id={blog.id}
                            />
                        ))
                    ) : (
                        <BlogCardShimmer />
                    )}
                </div>
                {blogs.length ? (
                    <RecommendedTags
                        tags={[
                            "Javascript",
                            "Tech",
                            "Socials",
                            "Ruby",
                            "Express",
                        ]}
                    />
                ) : (
                    <RecommendedTagsShimmer />
                )}
            </div>
        </div>
    );
};

export default Blogs;
