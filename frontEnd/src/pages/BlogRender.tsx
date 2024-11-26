import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useContext, useEffect } from "react";
import "../styles/EditorPage.css";
import { ThemeContext } from "../context/ThemeContext";

const extensions = [StarterKit];

interface BlogProps {
    post: string;
}

const BlogRender: React.FC<BlogProps> = ({ post }) => {
    console.log(post);
    const editor = useEditor({
        content: JSON.parse(post),
        extensions,
        editable: false,
        shouldRerenderOnTransaction: false,
    });

    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }
    const { isDarkMode } = themeContext;

    useEffect(() => {
        const theme = isDarkMode ? "dark" : "light";
        document.body.className = theme;
    }, [isDarkMode]);

    return <EditorContent editor={editor} />;
};

export default BlogRender;
