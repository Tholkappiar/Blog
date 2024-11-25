import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

type EditorType = string;

interface EditorContextType {
    editor: EditorType | null;
    setEditor: Dispatch<SetStateAction<EditorType | null>>;
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

// Create the provider component
export const EditorProviderContext: React.FC<EditorProviderContextProps> = ({
    children,
}) => {
    const [editor, setEditor] = useState<EditorType | null>(null);

    return (
        <EditorContext.Provider value={{ editor, setEditor }}>
            {children}
        </EditorContext.Provider>
    );
};
