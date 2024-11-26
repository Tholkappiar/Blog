import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../styles/EditorPage.css";
import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
    EditorProviderContext,
    useEditorContext,
} from "../context/EditorContext";
import { BubbleBar } from "../Editor/BubbleMenu";
import { MenuBar } from "../Editor/MenuBar";

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
];

const content = `
<p>
  start your story <strong>here</strong>.
</p>
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

    const { editorState, setEditorState } = useEditorContext();

    const editor = useEditor({
        extensions,
        content: editorState.post || content,
        onUpdate({ editor }) {
            setEditorState((prevState) => ({
                ...prevState,
                post: JSON.stringify(editor?.getJSON()),
            }));
            console.log(JSON.stringify(editor?.getJSON()));
        },
    });

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const excerptRef = useRef<HTMLTextAreaElement | null>(null);

    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
        setEditorState((prevState) => ({
            ...prevState,
            title: capitalized,
        }));
    };

    const handleExcerptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
        setEditorState((prevState) => ({
            ...prevState,
            excerpt: capitalized,
        }));
    };

    useEffect(() => {
        setEditorState((prevState) => ({
            ...prevState,
            post: JSON.stringify(editor?.getJSON()),
        }));

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            textareaRef.current.focus();
        }
    }, [editorState.title]);
    useEffect(() => {
        if (excerptRef.current) {
            excerptRef.current.style.height = "auto";
            excerptRef.current.style.height = `${excerptRef.current.scrollHeight}px`;
            excerptRef.current.focus();
        }
    }, [editorState.excerpt]);

    function handleTags(event: ChangeEvent<HTMLInputElement>) {
        const tags = event.target.value.split(" ");
        setEditorState((prev) => ({
            ...prev,
            tags: tags,
        }));
    }

    return (
        <EditorProviderContext>
            <div className="max-w-3xl 3xl:max-w-7xl mx-auto">
                <MenuBar editor={editor} />
                <textarea
                    ref={textareaRef}
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={editorState.title || ""}
                    className="outline-none resize-none bg-inherit px-4 text-2xl md:text-3xl lg:text-4xl text-primary dark:text-darkPrimary font-serif w-full"
                />
                <textarea
                    ref={excerptRef}
                    placeholder="Excerpt"
                    onChange={handleExcerptChange}
                    value={editorState.excerpt || ""}
                    className="outline-none resize-none bg-inherit px-4 text-lg text-primary dark:text-darkPrimary font-serif w-full"
                />
                <EditorContent editor={editor} className="p-5" />
                <BubbleBar editor={editor} />
                <input
                    type="text"
                    placeholder="Tags"
                    onChange={handleTags}
                    className="bg-inherit md:my-5 px-4 text-lg text-primary dark:text-darkPrimary font-mono w-full border outline-none"
                />
            </div>
        </EditorProviderContext>
    );
};

export default EditorPage;
