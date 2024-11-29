import { useEditor, EditorContent } from "@tiptap/react";
import "../styles/EditorPage.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
    EditorProviderContext,
    useEditorContext,
} from "../context/EditorContext";
import { BubbleBar } from "../Editor/BubbleMenu";
import { content, extensions } from "@/Editor/EditorUtils";
import { useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { API_ROUTES } from "@/utils/apiEndpoints";
import { BlogFullShimmer } from "@/components/BlogShimmerEffects";
import { MenuBar } from "@/Editor/MenuBar";

const EditorPage = () => {
    const { editorState, setEditorState } = useEditorContext();
    const [loading, setLoading] = useState(true);
    const post = editorState.post ? JSON.parse(editorState.post) : content;

    const editor = useEditor({
        extensions,
        content: post,
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
            title: value.charAt(0).toUpperCase() + value.slice(1),
        }));
    };

    const handleExcerptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setEditorState((prevState) => ({
            ...prevState,
            excerpt: value.charAt(0).toUpperCase() + value.slice(1),
        }));
    };

    function handleTags(event: ChangeEvent<HTMLInputElement>) {
        const tags = event.target.value.split(" ");
        setEditorState((prevState) => ({
            ...prevState,
            tags,
        }));
    }

    const params = useParams();
    const { id } = params;
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const from = location.state?.page === "editPage";

    useEffect(() => {
        async function getBlog(blogId: string) {
            try {
                const response = await axiosPrivate.get(
                    API_ROUTES.BLOG.GET_BLOG(blogId)
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
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        }

        if (params && id && from) {
            getBlog(id);
        } else {
            setLoading(false);
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

    const [flag, setFlag] = useState(true);
    useEffect(() => {
        if (flag && editor && editorState.post) {
            editor.commands.setContent(JSON.parse(editorState.post));
            console.log("expensive");
            setFlag(false);
        }
    }, [editor, editorState.post, flag]);

    return (
        <EditorProviderContext>
            <div className="w-full max-w-3xl 3xl:max-w-7xl mx-auto">
                {loading ? (
                    <BlogFullShimmer />
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </EditorProviderContext>
    );
};

export default EditorPage;
