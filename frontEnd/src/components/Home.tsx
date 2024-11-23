import useAuth from "../hooks/useAuth";

const Home = () => {
    const { user } = useAuth();
    return (
        <div className="text-center min-h-full">
            <p className="w-1/2 mx-auto text-primary dark:text-darkPrimary">
                JWT
            </p>
            <p className="break-words bg-accentBackground w-1/2 mx-auto text-center font-semibold text-accentText dark:text-darkAccentText">
                {user?.token ? user?.token : "No token in context"}
            </p>
        </div>
    );
};

export default Home;
