import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

type EditorState = {
    title: string;
    excerpt: string;
    post: string | null;
    tags: string[] | null;
};

interface EditorContextType {
    editorState: EditorState;
    setEditorState: Dispatch<SetStateAction<EditorState>>;
}

const EditorContext = createContext<EditorContextType | null>(null);

export const useEditorContext = (): EditorContextType => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error(
            "useEditorContext must be used within an EditorProviderContext"
        );
    }
    return context;
};

interface EditorProviderContextProps {
    children: ReactNode;
}

export const EditorProviderContext: React.FC<EditorProviderContextProps> = ({
    children,
}) => {
    const [editorState, setEditorState] = useState<EditorState>({
        title: "",
        excerpt: "",
        post: null,
        tags: null,
    });

    return (
        <EditorContext.Provider value={{ editorState, setEditorState }}>
            {children}
        </EditorContext.Provider>
    );
};
