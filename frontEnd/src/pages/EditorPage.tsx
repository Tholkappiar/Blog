import { useRef, useEffect, ChangeEvent, useContext } from "react";
import { EditorContext } from "../context/EditorContext";

const EditorPage = () => {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("EditorPage must be used within an EditorProvider");
    }

    const { postData, setPostData } = context;

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    }

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [postData.story]);

    return (
        <div className="flex flex-col container mx-auto gap-12 mt-8 p-4 sm:p-0 h-full">
            <div className="flex flex-col gap-8">
                <input
                    type="text"
                    className="border-2 border-divider outline-none p-2 rounded-md text-textmain"
                    placeholder="Title"
                    name="title"
                    onChange={(event) => handleChange(event)}
                />
                <textarea
                    ref={textareaRef}
                    value={postData.story}
                    name="story"
                    onChange={(event) => handleChange(event)}
                    className="border-2 border-divider outline-none p-2 resize-none rounded-md text-textmain"
                    placeholder="Write your story...!"
                />
            </div>
            <input
                type="text"
                className="border-2 border-divider outline-none p-2 rounded-md text-textmain"
                placeholder="Tags"
                name="tags"
                onChange={(event) => handleChange(event)}
            />
        </div>
    );
};

export default EditorPage;
