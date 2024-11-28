import { useEditor, EditorContent } from "@tiptap/react";
import "../styles/EditorPage.css";
import { ChangeEvent, useEffect, useRef } from "react";
import {
    EditorProviderContext,
    useEditorContext,
} from "../context/EditorContext";
import { BubbleBar } from "../Editor/BubbleMenu";
import { MenuBar } from "../Editor/MenuBar";
import { extensions } from "@/Editor/extension";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { API_ROUTES } from "@/utils/apiEndpoints";
import { content } from "./EditorPage";

const UpdateBlog = () => {
    const { editorState, setEditorState } = useEditorContext();
    const edit = editorState.post ? JSON.parse(editorState.post) : content;
    const editor = useEditor({
        extensions,
        content: edit,
        onUpdate({ editor }) {
            setEditorState((prevState) => ({
                ...prevState,
                post: JSON.stringify(editor?.getJSON()),
            }));
        },
    });

    useEffect(() => {
        if (editor) editor.commands.setContent(edit);
        console.log("expensive");
    }, [editorState]);

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

    const params = useParams();
    const { id } = params;
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        async function getBlog(id: string) {
            const response = await axiosPrivate.get(
                API_ROUTES.BLOG.GET_BLOG(id)
            );
            if (response.status === 200) {
                const blog = response.data.blog;
                setEditorState({
                    title: blog.title,
                    excerpt: blog.excerpt,
                    id: blog.id,
                    post: blog.post,
                    tags: blog.tags,
                });
                console.log(blog);
            }
        }

        if (params && id) {
            getBlog(id);
        }
    }, []);

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
