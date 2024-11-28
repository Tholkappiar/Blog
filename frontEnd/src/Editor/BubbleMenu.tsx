import { Editor, BubbleMenu } from "@tiptap/react";

interface BubbleBarProps {
    editor: Editor | null;
}
export const BubbleBar: React.FC<BubbleBarProps> = ({ editor }) => {
    if (!editor) return null;

    return (
        <BubbleMenu
            editor={editor}
            tippyOptions={{
                duration: 100,
            }}
        >
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
