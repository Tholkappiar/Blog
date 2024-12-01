import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";

interface DeleteDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    deleteBlog: () => void;
    isDeleting: boolean;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
    openDialog,
    setOpenDialog,
    deleteBlog,
    isDeleting,
}) => {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you absolutely sure to delete this Blog?
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your Blog and remove your data from our servers.
                    </DialogDescription>
                    <button
                        onClick={() => {
                            deleteBlog();
                            setOpenDialog(false);
                        }}
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
    );
};

interface LogoutDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    logout: () => void;
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({
    openDialog,
    setOpenDialog,
    logout,
}) => {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure ?</DialogTitle>
                    <DialogDescription>
                        Are you absolutely sure to Logout from this account ?
                    </DialogDescription>
                    <button
                        onClick={async () => {
                            await logout();
                            setOpenDialog(false);
                        }}
                        className="bg-destructive text-white font-semibold text-sm px-4 py-2 rounded"
                    >
                        Confirm Logout
                    </button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
