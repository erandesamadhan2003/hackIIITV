import Editor from "@monaco-editor/react";
import { aiService } from "@/services/ai.service";
import { toast } from "react-toastify";

export const Code = ({ code, setCode, language, setLanguage, filename }) => {
    const handleGeminiSuggestion = async () => {
        try {
            const suggestion = await aiService.suggestCode(code);

            const cleaned = suggestion
                .replace(/```[\s\S]*?```/g, (match) => {
                    return match
                        .replace(/```[a-z]*\n?/gi, "")
                        .replace(/```$/, "");
                })
                .trim();

            if (cleaned) {
                setCode(cleaned);
            }
        } catch (err) {
            toast.error(err?.message || "AI suggestion failed");
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1A1A1A] text-[#FFFFFF] p-4">
            {/* Language Selector */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <label className="text-sm font-semibold tracking-wide text-[#FFFFFF]/80">
                        LANGUAGE:
                    </label>
                    <select
                        className="bg-[#0D0D0D] text-[#FFFFFF] border border-[#1E90FF]/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00FF85] transition-all duration-300"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>

                <button
                    onClick={handleGeminiSuggestion}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#FF0099] to-[#1E90FF] text-[#FFFFFF] font-bold hover:from-[#FF0099]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#FF0099]/25 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                    ✨ AI Suggestion
                </button>
            </div>

            {/* Filename Display */}
            {filename && (
                <p className="text-sm text-[#FFFFFF]/60 mb-2 px-2">
                    📂 Editing:{" "}
                    <span className="text-[#00FF85]">{filename}</span>
                </p>
            )}

            {/* Code Editor */}
            <div className="flex-1 border border-[#1E90FF]/30 rounded-xl overflow-hidden shadow-lg">
                <Editor
                    height="67vh"
                    theme="vs-dark"
                    language={language}
                    value={code}
                    onChange={setCode}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: {
                            other: true,
                            comments: false,
                            strings: true,
                        },
                        wordBasedSuggestions: true,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        lineHeight: 24,
                        padding: { top: 16, bottom: 16 },
                    }}
                />
            </div>
        </div>
    );
};
