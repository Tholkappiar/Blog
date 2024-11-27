import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import sun from "../assets/svgs/sun.svg";
import moon from "../assets/svgs/moon.svg";
import { useEditorContext } from "../context/EditorContext";
import { API_ROUTES } from "../utils/apiEndpoints";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Header = () => {
    const location = useLocation();
    const isEditorPage = location.pathname === "/post";
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }
    const { toggleTheme, isDarkMode } = themeContext;

    const { editorState } = useEditorContext();

    const { title, post, tags, excerpt } = editorState || {};
    const axiosPrivate = useAxiosPrivate();

    async function publishData() {
        const response = await axiosPrivate.post(API_ROUTES.BLOG.POST_BLOG, {
            title,
            post,
            tags,
            excerpt,
        });
        console.log(response);
    }

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
                <div className="flex items-center space-x-4 sm:space-x-8">
                    {isEditorPage && (
                        <button
                            className="bg-accent text-accent-foreground text-sm p-1 px-2 rounded-lg font-semibold hover:opacity-70"
                            onClick={publishData}
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
