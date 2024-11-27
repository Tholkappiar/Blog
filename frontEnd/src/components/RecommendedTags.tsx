import React from "react";

interface recommendedTags {
    tags: string[];
}

const RecommendedTags: React.FC<recommendedTags> = ({ tags }) => {
    return (
        <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-card shadow rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">
                    Popular Tags
                </h2>
                <div className="flex flex-wrap">
                    {tags.map((tag, index) => (
                        <span
                            key={tag + index}
                            className="bg-accent rounded-full px-3 py-1 text-sm font-semibold text-foreground mr-2 mb-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendedTags;
