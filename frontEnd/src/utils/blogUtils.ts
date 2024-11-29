// blogUtils.ts

export const extractTextFromJSON = (content: string): string => {
    try {
        const parsedContent = JSON.parse(content);
        let text = "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parsedContent.forEach((node: any) => {
            if (node.type === "text" && node.text) {
                text += " " + node.text.trim();
            }

            if (node.content && Array.isArray(node.content)) {
                text += " " + extractTextFromJSON(JSON.stringify(node.content));
            }
        });
        return text;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return content;
    }
};

export const getReadingTime = (text: string): string => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read`;
};
