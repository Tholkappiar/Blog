import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import sun from "../assets/svgs/sun.svg";
import moon from "../assets/svgs/moon.svg";
import { useEditorContext } from "../context/EditorContext";

const Header = () => {
    const location = useLocation();
    const isEditorPage = location.pathname === "/postt";
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }
    const { toggleTheme, isDarkMode } = themeContext;

    const { editorState } = useEditorContext();

    const { title, content } = editorState || {};

    function publishData() {
        console.log(content);
        console.log(title);
    }

    return (
        <div
            className={`border-2 border-darkMuted flex ${
                isEditorPage
                    ? "justify-between sm:justify-around"
                    : "justify-between"
            } py-2 px-4 sm:px-12 items-center w-3/4 md:1/2 lg:w-1/3 mx-auto rounded-xl my-4`}
        >
            <Link to={"/blogs"}>
                <p className="font-Oranienbaum font-bold text-2xl mx-2 text-primary dark:text-darkPrimary">
                    Th
                </p>
            </Link>
            <div className="flex items-center space-x-4 sm:space-x-8">
                {isEditorPage && (
                    <button
                        className="bg-accentBackground text-accentText text-sm p-2 rounded-lg font-semibold hover:bg-hoverSuccessAccent"
                        onClick={publishData}
                    >
                        Publish
                    </button>
                )}

                <img
                    onClick={toggleTheme}
                    src={isDarkMode ? moon : sun}
                    className="text-textMain dark:text-darkMuted size-5"
                />
            </div>
        </div>
    );
};

export default Header;
