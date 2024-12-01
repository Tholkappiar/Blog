import {
    Edit,
    Ellipsis,
    LoaderCircle,
    LockKeyhole,
    LockKeyholeOpen,
    OctagonX,
} from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";

type BlogDropDown = {
    id: string;
    published: boolean;
    filterBlog: (id: string) => void;
};

export function BlogCardDropDown({ id, filterBlog, published }: BlogDropDown) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isPublished, setIsPublished] = useState<boolean>(published);

    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();

    async function EditBlog() {
        navigate(`/updateBlog/${id}`, { state: { page: "editPage" } });
    }

    async function DeleteBlog() {
        setIsDeleting(true);
        try {
            const response = await axiosPrivate.delete(
                API_ROUTES.BLOG.DELETE_BLOG(id)
            );
            if (response.status === 200) {
                filterBlog(id);
            }
        } catch (err) {
            console.error("Error deleting blog:", err);
        } finally {
            setIsDeleting(false);
        }
    }
    const path = location.pathname === "/blogs";
    async function togglePublished() {
        try {
            const response = await axiosPrivate.post(
                API_ROUTES.BLOG.TOGGLE_BLOG_PUBLISHED(id)
            );

            if (response.status === HttpStatusCode.Ok) {
                setIsPublished((prev) => !prev);
                if (path) filterBlog(id);
            }
        } catch (err) {
            console.log(err);
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
                    <DropdownMenuItem onClick={togglePublished}>
                        {isPublished ? <LockKeyhole /> : <LockKeyholeOpen />}
                        <span>
                            {isPublished ? "Make Private" : "Make Public"}
                        </span>
                    </DropdownMenuItem>
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
