import { Edit, Ellipsis, OctagonX } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { API_ROUTES } from "@/utils/apiEndpoints";

type BlogDropDown = {
    id: string;
    deleteBlog: (id: string) => void;
};

export function BlogCardDropDown({ id, deleteBlog }: BlogDropDown) {
    const axiosPrivate = useAxiosPrivate();

    async function DeleteBlog() {
        try {
            const response = await axiosPrivate.delete(
                API_ROUTES.BLOG.DELETE_BLOG(id)
            );
            if (response.status === 200) {
                deleteBlog(id);
            }
        } catch (err) {
            console.error("Error deleting blog:", err);
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
                    <DropdownMenuItem>
                        <Edit />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={DeleteBlog}>
                        <OctagonX className="text-destructive" />
                        <span className="text-destructive">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
