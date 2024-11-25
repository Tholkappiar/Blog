import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../styles/EditorPage.css";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
    EditorProviderContext,
    useEditorContext,
} from "../context/EditorContext";
import { Editor } from "@tiptap/core";

interface MenuBarProps {
    editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="control-group sticky top-0 bg-background dark:bg-darkBackground z-10 py-10">
            <div className="button-group px-4">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is-active" : ""}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={editor.isActive("italic") ? "is-active" : ""}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    className={editor.isActive("strike") ? "is-active" : ""}
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={editor.isActive("code") ? "is-active" : ""}
                >
                    Code
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive("paragraph") ? "is-active" : ""}
                >
                    Paragraph
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 1 })
                            ? "is-active"
                            : ""
                    }
                >
                    H1
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? "is-active"
                            : ""
                    }
                >
                    H2
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "is-active"
                            : ""
                    }
                >
                    H3
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 4 })
                            ? "is-active"
                            : ""
                    }
                >
                    H4
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                    Bullet list
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : ""
                    }
                >
                    Ordered list
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    className={editor.isActive("codeBlock") ? "is-active" : ""}
                >
                    Code block
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={editor.isActive("blockquote") ? "is-active" : ""}
                >
                    Blockquote
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    Horizontal rule
                </button>
                <button
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                >
                    Hard break
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    Undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    Redo
                </button>
            </div>
        </div>
    );
};

interface BubbleBarProps {
    editor: Editor | null;
}

const BubbleBar: React.FC<BubbleBarProps> = ({ editor }) => {
    if (!editor) return null;

    return (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="bubble-menu">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is-active" : ""}
                >
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is-active" : ""}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-italic"
                    >
                        <line x1="19" x2="10" y1="4" y2="4" />
                        <line x1="14" x2="5" y1="20" y2="20" />
                        <line x1="15" x2="9" y1="4" y2="20" />
                    </svg>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "is-active" : ""}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-strikethrough"
                    >
                        <path d="M16 4H9a3 3 0 0 0-2.83 4" />
                        <path d="M14 12a4 4 0 0 1 0 8H6" />
                        <line x1="4" x2="20" y1="12" y2="12" />
                    </svg>
                </button>
            </div>
        </BubbleMenu>
    );
};

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
];

const content = `
<h2>Hi there,</h2><p>this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p><ul><li><p>That’s a bullet list with one …</p></li></ul>
`;

const EditorPage = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }
    const { isDarkMode } = themeContext;
    useEffect(() => {
        const theme = isDarkMode ? "dark" : "light";
        document.body.className = theme;
    }, [isDarkMode]);

    const { setEditor } = useEditorContext();

    const editor = useEditor({
        extensions,
        content,
        onUpdate({ editor }) {
            setEditor(JSON.stringify(editor?.getJSON()));
        },
    });

    useEffect(() => {
        setEditor(JSON.stringify(editor?.getJSON()));
    }, []);

    return (
        <EditorProviderContext>
            <div className="max-w-3xl 3xl:max-w-7xl mx-auto">
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
                <BubbleBar editor={editor} />
            </div>
        </EditorProviderContext>
    );
};

export default EditorPage;
