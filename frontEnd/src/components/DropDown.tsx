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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

type BlogDropDown = {
    id: string;
    published: boolean;
    filterBlog: (id: string) => void;
};

export function BlogCardDropDown({ id, filterBlog, published }: BlogDropDown) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isPublished, setIsPublished] = useState<boolean>(published);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();

    async function EditBlog() {
        navigate(`/updateBlog/${id}`, { state: { page: "editPage" } });
    }

    async function deleteBlog() {
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
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="hover:bg-muted p-2 rounded">
                        <Ellipsis className="size-4 text-foreground" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={togglePublished}>
                            {isPublished ? (
                                <LockKeyhole />
                            ) : (
                                <LockKeyholeOpen />
                            )}
                            <span>
                                {isPublished ? "Make Private" : "Make Public"}
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={EditBlog}>
                            <Edit />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setOpenDialog((prev) => !prev)}
                        >
                            <OctagonX
                                className={`text-destructive ${
                                    isDeleting ? "hidden" : "block"
                                }`}
                            />
                            <span className="text-destructive">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Are you absolutely sure to delete this Blog?
                        </DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your Blog and remove your data from our
                            servers.
                        </DialogDescription>
                        <button
                            onClick={deleteBlog}
                            className="bg-destructive text-white font-semibold text-sm px-4 py-2 rounded"
                        >
                            {isDeleting ? (
                                <div className="flex gap-2 items-center justify-center">
                                    <LoaderCircle className="animate-spin" />
                                    <span>Deleting...</span>
                                </div>
                            ) : (
                                <p>Confirm Delete</p>
                            )}
                        </button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
