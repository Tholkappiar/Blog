import useAuth from "@/hooks/useAuth";

export const UserAvatar = () => {
    const { user } = useAuth();
    return (
        <div className="size-7 bg-gray-600 dark:bg-secondary flex items-center justify-center rounded-full">
            <p className="text-sm font-mono text-white">
                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
            </p>
        </div>
    );
};
