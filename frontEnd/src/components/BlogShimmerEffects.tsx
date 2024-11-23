export function BlogCardShimmer() {
    return (
        <article className="bg-card dark:bg-darkCard shadow rounded-lg p-6 mb-8 animate-pulse">
            <h2 className="bg-darkTextMain dark:bg-textMain mb-2 p-2"></h2>
            <p className="bg-darkTextMain dark:bg-textMain p-2 mb-4"></p>
            <div className="flex gap-4">
                <span className="bg-darkTextMain dark:bg-textMain p-2"></span>
                <span className="bg-darkTextMain dark:bg-textMain p-2"></span>
            </div>
            <div className="mt-4 flex flex-wrap">
                {[...Array(6)].map((_, index) => (
                    <span
                        key={index}
                        className="bg-darkTextMain dark:bg-textMain rounded-full px-4 py-3 mr-2 mb-2"
                    ></span>
                ))}
            </div>
        </article>
    );
}

export function BlogFullShimmer() {
    return (
        <div className="lg:w-2/3 sm:p-4 py-8 animate-pulse">
            <div className="p-3 mb-4 bg-darkTextMain dark:bg-textMain rounded"></div>
            <p className="p-2 mb-4 w-1/2 bg-darkTextMain dark:bg-textMain rounded"></p>
            {[...Array(6)].map((_, index) => (
                <div
                    key={index}
                    className="p-2 mt-2 w-10/12 bg-darkTextMain dark:bg-textMain rounded"
                ></div>
            ))}
        </div>
    );
}

export function AuthorCardShimmer() {
    return (
        <div className="lg:w-1/3 sm:p-4 py-8 animate-pulse">
            <p className="h-6 bg-darkTextMain dark:bg-textMain rounded"></p>
            <div className="flex items-center space-x-4 mt-5">
                <ProfileIconShimmer />
                <p className="p-2 w-1/2 bg-darkTextMain dark:bg-textMain rounded"></p>
            </div>
        </div>
    );
}

export function RecommendedTagsShimmer() {
    return (
        <div className="lg:w-1/3 mt-8 lg:mt-0 animate-pulse">
            <div className="bg-card dark:bg-darkCard shadow rounded-lg p-6">
                <h2 className="bg-darkTextMain dark:bg-textMain p-2 mb-4"></h2>
                <div className="flex flex-wrap">
                    {[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            className="bg-darkTextMain dark:bg-textMain rounded-full px-10 py-3 dark:text-darkAccentText mr-2 mb-2"
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ProfileIconShimmer() {
    return (
        <div className="rounded-full bg-darkTextMain dark:bg-textMain size-7 flex justify-center items-center animate-pulse"></div>
    );
}
