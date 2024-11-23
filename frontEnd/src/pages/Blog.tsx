import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorCard from "../components/AuthorCard";
import BlogDisplay from "../components/BlogDisplay";
import {
    AuthorCardShimmer,
    BlogFullShimmer,
} from "../components/BlogShimmerEffects";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { API_ROUTES } from "../utils/apiEndpoints";

type Blog = {
    authorId: string;
    id: string;
    post: string;
    title: string;
    tags: string[];
};

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [error, setError] = useState<string | null>(null);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) {
                setError("Invalid blog ID");
                return;
            }

            try {
                const response = await axiosPrivate.get(
                    API_ROUTES.BLOG.GET_BLOG(id)
                );
                if (response.data && response.data.blog) {
                    setBlog(response.data.blog);
                } else {
                    throw new Error("Blog not found");
                }
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to fetch blog"
                );
            }
        };

        fetchBlog();
    }, [id]);

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 py-8 flex flex-col lg:flex-row">
            {blog ? (
                <>
                    <BlogDisplay title={blog?.title} post={blog?.post} />
                    <AuthorCard authorId={blog?.id || ""} />
                </>
            ) : (
                <>
                    <BlogFullShimmer />
                    <AuthorCardShimmer />
                </>
            )}
            {/* <BlogFullShimmer />
            <AuthorCardShimmer /> */}
        </div>
    );
};

export default Blog;
