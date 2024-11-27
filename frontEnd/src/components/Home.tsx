import useAuth from "../hooks/useAuth";

const Home = () => {
    const { user } = useAuth();
    return (
        <div className="text-center min-h-full">
            <p className="w-1/2 mx-auto text-foreground">JWT</p>
            <p className="break-words bg-muted w-1/2 mx-auto text-center font-semibold text-foreground">
                {user?.token ? user?.token : "No token in context"}
            </p>
        </div>
    );
};

export default Home;
