import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEditorContext } from "../context/EditorContext";
import { API_ROUTES } from "../utils/apiEndpoints";
import useAxiosPrivate from "../hooks/useAxiosPrivate"; // For logged-in users
import axiosInstance from "../utils/axiosInstance"; // Public Axios instance for unauthenticated users
import { ThemeToggle } from "./ThemeToggle";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import { HttpStatusCode } from "axios";

const Header = () => {
    const location = useLocation();
    const isEditorPage =
        location.pathname === "/post" ||
        location.pathname.split("/")[1] === "updateBlog";

    const { editorState } = useEditorContext();

    const { title, post, tags, excerpt } = editorState || {};

    // Use authentication context to check if user is logged in
    const { user, setUser, persist, setPersist } = useAuth();

    // Always call useAxiosPrivate, then conditionally use it or the public axios instance
    const axiosPrivate = useAxiosPrivate(); // Always call it first
    const axios = persist ? axiosPrivate : axiosInstance; // Conditional assignment after hook

    const from = location.state?.page === "editPage";
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();

    async function publishBlog() {
        try {
            if (from && id) {
                const updateResponse = await axios.put(
                    API_ROUTES.BLOG.UPDATE_BLOG(id),
                    {
                        title,
                        post,
                        tags,
                        excerpt,
                    }
                );
                if (updateResponse.status === HttpStatusCode.Ok) {
                    navigate("/blogs", { replace: true });
                }
            } else {
                const postResponse = await axios.post(
                    API_ROUTES.BLOG.POST_BLOG,
                    {
                        title,
                        post,
                        tags,
                        excerpt,
                    }
                );
                if (postResponse.status === 201) {
                    navigate("/blogs", { replace: true });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Logout function
    async function handleLogout() {
        const response = await axios.post(API_ROUTES.USER.LOGOUT);
        if (response.status === HttpStatusCode.Ok) {
            localStorage.setItem("persist", "false");
            setPersist(false);
            setUser({ token: "" });
        }
    }

    return (
        <div
            className={`border-2 border-border flex justify-between py-1 px-4 items-center w-3/4 md:1/2 lg:w-1/3 mx-auto rounded-xl my-4 bg-background`}
        >
            <Link to={"/blogs"}>
                <p className="font-Oranienbaum font-bold text-xl mx-2 text-foreground">
                    Th
                </p>
            </Link>
            <div className="flex items-center justify-center space-x-4 sm:space-x-8">
                {/* Show Publish button only for editor pages and logged-in users */}
                {isEditorPage && user.token && (
                    <button
                        className="dark:bg-green-700 bg-green-500 text-foreground text-sm p-1 px-2 rounded-lg font-semibold hover:opacity-70"
                        onClick={publishBlog}
                    >
                        Publish
                    </button>
                )}
                <div className="flex gap-2">
                    <ThemeToggle />
                    {user.token && ( // Only show logout button if the user is logged in
                        <Button
                            variant={"ghost"}
                            size="sm"
                            className="focus-visible:ring-offset-0 focus-visible:ring-0"
                            onClick={handleLogout}
                        >
                            <LogOut className="text-foreground transition-none" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
