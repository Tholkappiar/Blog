import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../styles/EditorPage.css";
import { ChangeEvent, useEffect, useRef } from "react";
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

const UpdateBlog = () => {
    const { editorState, setEditorState } = useEditorContext();

    const editor = useEditor({
        extensions,
        content: JSON.parse(editorState.post || "{}"),
        onUpdate({ editor }) {
            setEditorState((prevState) => ({
                ...prevState,
                post: JSON.stringify(editor?.getJSON()),
            }));
        },
    });

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const excerptRef = useRef<HTMLTextAreaElement | null>(null);

    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setEditorState((prevState) => ({
            ...prevState,
            title: value,
        }));
    };

    const handleExcerptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setEditorState((prevState) => ({
            ...prevState,
            excerpt: value,
        }));
    };

    const handleTagsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const tags = event.target.value.split(" ");
        setEditorState((prevState) => ({
            ...prevState,
            tags,
        }));
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [editorState.title]);

    useEffect(() => {
        if (excerptRef.current) {
            excerptRef.current.style.height = "auto";
            excerptRef.current.style.height = `${excerptRef.current.scrollHeight}px`;
        }
    }, [editorState.excerpt]);

    return (
        <EditorProviderContext>
            <div className="max-w-3xl 3xl:max-w-7xl mx-auto">
                <MenuBar editor={editor} />
                <textarea
                    ref={textareaRef}
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={editorState.title}
                    className="bg-inherit outline-none resize-none px-4 text-2xl md:text-3xl lg:text-4xl text-foreground font-serif w-full"
                />
                <textarea
                    ref={excerptRef}
                    placeholder="Excerpt"
                    onChange={handleExcerptChange}
                    value={editorState.excerpt}
                    className="outline-none resize-none bg-inherit px-4 text-lg text-foreground font-serif w-full"
                />
                <EditorContent editor={editor} className="p-5" />
                <BubbleBar editor={editor} />
                <div className="p-5">
                    <input
                        type="text"
                        placeholder="Tags (separated by spaces)"
                        value={editorState?.tags?.join(" ")}
                        onChange={handleTagsChange}
                        className="bg-inherit md:my-5 p-2 text-lg text-foreground font-mono w-full border outline-none"
                    />
                </div>
            </div>
        </EditorProviderContext>
    );
};

export default UpdateBlog;
