import axios from "axios";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

export const aiService = {
    async suggestCode(code) {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("Missing VITE_GEMINI_API_KEY in frontend environment.");
        }

        const prompt = `Only return JavaScript code. Do not include explanations. Complete this code:\n\n${code}\n`;

        const { data } = await axios.post(
            `${GEMINI_BASE_URL}/models/gemini-2.5-pro:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    },
};
