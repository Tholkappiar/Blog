import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEditorContext } from "../context/EditorContext";
import { API_ROUTES } from "../utils/apiEndpoints";
import { ThemeToggle } from "./ThemeToggle";
import { LoaderCircle, LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { HttpStatusCode } from "axios";
import useAxiosInstance from "@/hooks/useAxiosInstance";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./Avatar";
import { LogoutDialog } from "./CustomDialogs";
import { useState } from "react";

const Header = () => {
    const location = useLocation();
    const isEditorPage =
        location.pathname === "/post" ||
        location.pathname.split("/")[1] === "updateBlog";

    const { editorState } = useEditorContext();

    const { title, post, tags, excerpt } = editorState || {};

    const { user, setUser, setPersist } = useAuth();

    const axios = useAxiosInstance();

    const from = location.state?.page === "editPage";
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();

    const [isPublished, setIsPublished] = useState<boolean>(true);
    async function publishBlog() {
        try {
            setIsPublished(false);
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
                    navigate("/", { replace: true });
                    setIsPublished(true);
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
                    navigate("/", { replace: true });
                    setIsPublished(true);
                }
            }
        } catch (err) {
            console.log(err);
            setIsPublished(true);
        }
    }

    // Logout function
    const [isLogout, setIsLogout] = useState<boolean>(false);
    async function handleLogout() {
        const response = await axios.post(API_ROUTES.USER.LOGOUT);
        if (response.status === HttpStatusCode.Ok) {
            localStorage.setItem("persist", "false");
            setPersist(false);
            setUser({ token: "" });
            navigate("/");
        }
    }

    return (
        <>
            <div
                className={`border-2 border-border flex justify-between py-1 px-4 items-center w-3/4 md:1/2 lg:w-1/3 mx-auto rounded-xl my-4 bg-background`}
            >
                <Link to={"/"}>
                    <p className="font-Oranienbaum font-bold text-xl mx-2 text-foreground">
                        Th
                    </p>
                </Link>
                <div className="flex items-center justify-center space-x-4 sm:space-x-8">
                    <div className="flex items-center gap-4">
                        {user.token && isEditorPage && (
                            <button
                                className={`dark:bg-green-700 bg-green-500 ${
                                    !isPublished && "opacity-50"
                                } text-foreground text-xs py-1 px-2 rounded-lg hover:opacity-70`}
                                onClick={publishBlog}
                                disabled={isPublished ? false : true}
                            >
                                <div className="flex gap-1">
                                    {isPublished || (
                                        <LoaderCircle className="animate-spin size-4 text-foreground" />
                                    )}
                                    <span>Publish</span>
                                </div>
                            </button>
                        )}
                        <div className="flex">
                            <ThemeToggle />
                        </div>
                    </div>
                    {user.token && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <UserAvatar />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="text-xs font-mono">
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    asChild
                                    className="text-xs font-mono"
                                >
                                    <Link to={"/myBlogs"}>My Blogs</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    asChild
                                    className="text-xs font-mono"
                                >
                                    <Link to={"/post"}>Post Blog</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setIsLogout((prev) => !prev)}
                                    className="text-xs font-mono text-destructive"
                                >
                                    <LogOut className="text-destructive transition-none" />
                                    <span className="text-destructive">
                                        Logout
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                <LogoutDialog
                    logout={handleLogout}
                    openDialog={isLogout}
                    setOpenDialog={setIsLogout}
                />
            </div>
        </>
    );
};

export default Header;
