import React, { createContext, ReactNode, useState } from "react";

interface PostData {
    title: string;
    story: string;
    tags: string[];
}

export interface contextType {
    postData: PostData;
    setPostData: React.Dispatch<React.SetStateAction<PostData>>;
    handleSubmit: () => void;
}

export const EditorContext = createContext<contextType | null>(null);

interface EditorProviderProps {
    children: ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
    const [postData, setPostData] = useState<PostData>({
        title: "",
        story: "",
        tags: [],
    });

    function handleSubmit() {
        console.log(postData);
    }

    return (
        <EditorContext.Provider value={{ postData, setPostData, handleSubmit }}>
            {children}
        </EditorContext.Provider>
    );
};
