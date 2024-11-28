import { useEditor, EditorContent } from "@tiptap/react";
import "../styles/EditorPage.css";
import { ChangeEvent, useEffect, useRef } from "react";
import {
    EditorProviderContext,
    useEditorContext,
} from "../context/EditorContext";
import { BubbleBar } from "../Editor/BubbleMenu";
import { MenuBar } from "../Editor/MenuBar";
import { content, extensions } from "@/Editor/extension";
import { useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { API_ROUTES } from "@/utils/apiEndpoints";

const EditorPage = () => {
    const { editorState, setEditorState } = useEditorContext();
    const post = editorState.post ? JSON.parse(editorState.post) : content;
    const editor = useEditor({
        extensions,
        content: post,
        onUpdate({ editor }) {
            setEditorState((prevState) => ({
                ...prevState,
                post: JSON.stringify(editor?.getJSON()),
            }));
            console.log(JSON.stringify(editor?.getJSON()));
        },
        shouldRerenderOnTransaction: false,
    });

    useEffect(() => {
        if (editor) editor.commands.setContent(post);
        console.log("expensive");
    }, [editorState]);

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

    function handleTags(event: ChangeEvent<HTMLInputElement>) {
        const tags = event.target.value.split(" ");
        setEditorState((prev) => ({
            ...prev,
            tags: tags,
        }));
    }

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
    }, [editor, editorState.title, setEditorState]);

    useEffect(() => {
        if (excerptRef.current) {
            excerptRef.current.style.height = "auto";
            excerptRef.current.style.height = `${excerptRef.current.scrollHeight}px`;
            excerptRef.current.focus();
        }
    }, [editorState.excerpt]);

    const params = useParams();
    const { id } = params;
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const from = location.state?.page === "editPage";

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

        if (params && id && from) {
            getBlog(id);
        }

        return () => {
            setEditorState({
                title: "",
                excerpt: "",
                post: "",
                tags: [],
                id: null,
            });
        };
    }, []);

    return (
        <EditorProviderContext>
            <div className="max-w-3xl 3xl:max-w-7xl mx-auto">
                <MenuBar editor={editor} />
                <textarea
                    ref={textareaRef}
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={editorState.title || ""}
                    className="bg-inherit outline-none resize-none px-4 text-2xl md:text-3xl lg:text-4xl text-foreground font-serif w-full"
                />
                <textarea
                    ref={excerptRef}
                    placeholder="Excerpt"
                    onChange={handleExcerptChange}
                    value={editorState.excerpt || ""}
                    className="outline-none resize-none bg-inherit px-4 text-lg text-foreground font-serif w-full"
                />
                <EditorContent editor={editor} className="p-5" />
                <BubbleBar editor={editor} />
                <div className="p-5">
                    <input
                        type="text"
                        value={editorState.tags?.join(" ")}
                        placeholder="Tags"
                        onChange={handleTags}
                        className="bg-inherit md:my-5 p-2 text-lg text-foreground font-mono w-full border outline-none"
                    />
                </div>
            </div>
        </EditorProviderContext>
    );
};

export default EditorPage;
