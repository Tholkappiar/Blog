import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { EditorContext } from "../context/EditorContext";
import { ThemeContext } from "../context/ThemeContext";
import sun from "../assets/svgs/sun.svg";
import moon from "../assets/svgs/moon.svg";

const Header = () => {
    const location = useLocation();
    const isEditorPage = location.pathname === "/post";
    const editorContext = useContext(EditorContext);
    const themeContext = useContext(ThemeContext);

    if (!editorContext) {
        throw new Error("EditorPage must be used within an EditorProvider");
    }

    if (!themeContext) {
        throw new Error("Issue in Editor");
    }

    const { handleSubmit } = editorContext;
    const { toggleTheme, isDarkMode } = themeContext;

    return (
        <>
            <div
                className={`border-b-2 dark:border-darkMuted flex ${
                    isEditorPage
                        ? "justify-between sm:justify-around"
                        : "justify-between"
                } p-4 px-4 sm:px-12 items-center`}
            >
                <Link to={"/blogs"}>
                    <p className="font-Oranienbaum font-bold text-2xl mx-2 text-primary dark:text-darkPrimary">
                        Medium
                    </p>
                </Link>
                <div className="flex items-center space-x-4 sm:space-x-8">
                    {isEditorPage && (
                        <button
                            className="bg-accentBackground text-accentText text-sm p-2 rounded-lg font-semibold hover:bg-hoverSuccessAccent"
                            onClick={handleSubmit}
                        >
                            Publish
                        </button>
                    )}

                    <img
                        onClick={toggleTheme}
                        src={isDarkMode ? moon : sun}
                        className="text-textMain dark:text-darkMuted size-5"
                    />

                    <div className="rounded-full bg-orange-500 size-7 flex justify-center items-center">
                        <p className="text-primary dark:text-darkPrimary">P</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
