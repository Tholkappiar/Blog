type AuthorCardProps = {
    authorId: string;
};

const AuthorCard = ({ authorId }: AuthorCardProps) => {
    return (
        <div className="lg:w-1/3 sm:p-4 py-8">
            <p className="text-lg font-medium text-muted dark:text-darkMuted">
                Author
            </p>
            <div className="flex items-center space-x-2 md:space-x-8 mt-5">
                <div className="rounded-full bg-orange-500 size-7 flex justify-center items-center">
                    <p className="text-primary dark:text-darkPrimary">
                        {authorId.charAt(0)}
                    </p>
                </div>
                <p className="md:text-lg font-semibold text-textMain dark:text-darkTextMain">
                    {"authorId"}
                </p>
            </div>
        </div>
    );
};

export default AuthorCard;
