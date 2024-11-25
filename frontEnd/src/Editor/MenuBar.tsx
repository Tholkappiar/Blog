import { Editor } from "@tiptap/react";

interface MenuBarProps {
    editor: Editor | null;
}

export const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
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
