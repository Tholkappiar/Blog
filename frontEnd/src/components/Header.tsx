import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import sun from "../assets/svgs/sun.svg";
import moon from "../assets/svgs/moon.svg";
import { useEditorContext } from "../context/EditorContext";
import { API_ROUTES } from "../utils/apiEndpoints";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Header = () => {
    const [isPublished, setIsPublished] = useState<boolean>(false);

    const location = useLocation();
    const isEditorPage =
        location.pathname === "/post" || location.pathname === "/updateBlog";
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }
    const { toggleTheme, isDarkMode } = themeContext;

    const { editorState } = useEditorContext();

    const { title, post, tags, excerpt } = editorState || {};
    const axiosPrivate = useAxiosPrivate();

    const from = location.state?.from === "editPage";
    async function publishBlog() {
        try {
            if (from) {
                const updateResponse = await axiosPrivate.put(
                    API_ROUTES.BLOG.UPDATE_BLOG(""),
                    {
                        title,
                        post,
                        tags,
                        excerpt,
                    }
                );
                if (updateResponse.status === 200) {
                    console.log(updateResponse.data);
                }
            } else {
                const postResponse = await axiosPrivate.post(
                    API_ROUTES.BLOG.POST_BLOG,
                    {
                        title,
                        post,
                        tags,
                        excerpt,
                    }
                );
                if (postResponse.status === 201) {
                    setIsPublished(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (isPublished) {
            navigate("/blogs", { replace: true });
        }
    }, [isPublished]);

    return (
        <div className="bg-background">
            <div
                className={`border-2 border-border flex justify-between py-1 px-4 items-center w-3/4 md:1/2 lg:w-1/3 mx-auto rounded-xl my-4 bg-background`}
            >
                <Link to={"/blogs"}>
                    <p className="font-Oranienbaum font-bold text-xl mx-2 text-foreground">
                        Th
                    </p>
                </Link>
                <button onClick={() => console.log(editorState)}>print</button>
                <div className="flex items-center space-x-4 sm:space-x-8">
                    {isEditorPage && (
                        <button
                            className="dark:bg-green-700 bg-green-500 text-foreground text-sm p-1 px-2 rounded-lg font-semibold hover:opacity-70"
                            onClick={publishBlog}
                        >
                            Publish
                        </button>
                    )}

                    <img
                        onClick={toggleTheme}
                        src={isDarkMode ? moon : sun}
                        className="size-4"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
