import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../styles/EditorPage.css";

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

    return (
        <article className="mt-10">
            <EditorContent editor={editor} />
        </article>
    );
};

export default BlogRender;
