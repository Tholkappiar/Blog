import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { API_ROUTES } from "@/utils/apiEndpoints";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

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
                </DialogHeader>
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
                </DialogHeader>
                <button
                    onClick={async () => {
                        await logout();
                        setOpenDialog(false);
                    }}
                    className="bg-destructive text-white font-semibold text-sm px-4 py-2 rounded mt-2"
                >
                    Confirm Logout
                </button>
            </DialogContent>
        </Dialog>
    );
};

interface Profile {
    name: string;
    email: string;
}

interface ProfileDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}

export const ProfileDialog: React.FC<ProfileDialogProps> = ({
    openDialog,
    setOpenDialog,
}) => {
    const axiosToUse = useAxiosPrivate();
    const { user } = useAuth();

    const [profile, setProfile] = useState<Profile | undefined>(undefined);

    async function getProfileInformation() {
        try {
            const response = await axiosToUse.get(API_ROUTES.USER.GET_PROFILE);
            setProfile(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching profile information", error);
        }
    }

    useEffect(() => {
        if (user.token) {
            getProfileInformation();
        }
    }, [user.token]);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                </DialogHeader>
                <hr />
                <div className="space-y-1">
                    {profile ? (
                        <>
                            <p className="font-mono text-sm">{profile.name}</p>
                            <p className="font-mono text-sm text-muted-foreground">
                                {profile.email}
                            </p>
                        </>
                    ) : (
                        <p className="font-mono text-sm text-muted-foreground">
                            Loading profile...
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
