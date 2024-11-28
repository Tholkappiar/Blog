import { Edit, Ellipsis, LoaderCircle, OctagonX } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { API_ROUTES } from "@/utils/apiEndpoints";
import { useState } from "react";
import { useEditorContext } from "@/context/EditorContext";
import { useNavigate } from "react-router-dom";

type BlogDropDown = {
    storedState: {
        title: string;
        excerpt: string;
        post: string;
        tags: string[];
        id: string;
    };
    deleteBlog: (id: string) => void;
};

export function BlogCardDropDown({ storedState, deleteBlog }: BlogDropDown) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const axiosPrivate = useAxiosPrivate();

    const { setEditorState } = useEditorContext();
    const navigate = useNavigate();

    async function EditBlog() {
        setEditorState({
            title: storedState.title,
            excerpt: storedState.excerpt,
            post: storedState.post,
            tags: storedState.tags,
            id: storedState.id,
        });
        navigate(`/updateBlog`);
    }

    async function DeleteBlog() {
        setIsDeleting(true);
        try {
            const response = await axiosPrivate.delete(
                API_ROUTES.BLOG.DELETE_BLOG(storedState.id)
            );
            if (response.status === 200) {
                deleteBlog(storedState.id);
            }
        } catch (err) {
            console.error("Error deleting blog:", err);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="hover:bg-muted p-2 rounded">
                    <Ellipsis className="size-4 text-foreground" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={EditBlog}>
                        <Edit />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={DeleteBlog}>
                        <OctagonX
                            className={`text-destructive ${
                                isDeleting ? "hidden" : "block"
                            }`}
                        />
                        <span className="text-destructive">
                            {isDeleting ? (
                                <div className="flex gap-2 items-center">
                                    <LoaderCircle className="animate-spin text-destructive" />
                                    <span>Deleting...</span>
                                </div>
                            ) : (
                                <p className="text-destructive">Delete</p>
                            )}
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
