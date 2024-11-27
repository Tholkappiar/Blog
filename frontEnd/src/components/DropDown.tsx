import { Edit, Ellipsis, OctagonX } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function BlogCardDropDown() {
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
                    <DropdownMenuItem>
                        <OctagonX className="text-destructive" />
                        <span className="text-destructive">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
