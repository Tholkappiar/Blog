export function BlogCardShimmer() {
    return (
        <article className="rounded-lg p-6 mb-8 animate-pulse">
            <h2 className="mb-2 p-2 w-full bg-muted"></h2>
            <p className="mb-4 p-2 w-full bg-muted"></p>
            <div className="flex justify-between">
                <div className="my-2 flex gap-4">
                    <span className="py-2 px-5 bg-muted"></span>
                    <span className="py-2 px-5 bg-muted"></span>
                    <span className="py-2 px-5 bg-muted"></span>
                </div>
                <div className="flex flex-wrap gap-2 my-2 m-2">
                    {[...Array(2)].map((_, index) => (
                        <div
                            key={index}
                            className="p-2 bg-muted px-4 py-2"
                        ></div>
                    ))}
                </div>
            </div>
        </article>
    );
}

export function BlogFullShimmer() {
    return (
        <div className="sm:p-4 py-8 animate-pulse">
            <div className="p-3 mb-4 bg-muted rounded"></div>
            <p className="p-2 mb-8 w-1/2 bg-muted rounded"></p>
            {[...Array(6)].map((_, index) => (
                <div
                    key={index}
                    className="p-2 mt-2 w-10/12 bg-muted rounded"
                ></div>
            ))}
        </div>
    );
}
