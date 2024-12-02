import NotFoundImage from "../assets/svgs/404.svg";

const NotFound = () => {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <img
                    className="w-64 h-auto select-none"
                    src={NotFoundImage}
                    alt="404 Not Found"
                />
                <p className="text-center text-foreground text-xl lg:text-2xl font-bold font-mono">
                    Page Not Found !
                </p>
            </div>
        </div>
    );
};

export default NotFound;
