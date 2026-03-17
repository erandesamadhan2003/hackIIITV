import { useState } from "react";
import { codeService } from "@/services/code.service";
import { getApiErrorMessage } from "@/api/client";

export const OutputConsole = ({ code, language }) => {
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const runCode = async () => {
        setLoading(true);
        try {
            const data = await codeService.executeCode({ code, language });
            setOutput(data.output);
        } catch (error) {
            setOutput(getApiErrorMessage(error, "Error connecting to server!"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#1A1A1A] border border-[#1E90FF]/30 rounded-xl p-4 text-[#FFFFFF] mx-1 shadow-lg">
            <div className="flex gap-6 justify-between items-center">
                <h2 className="text-lg font-bold tracking-wide bg-gradient-to-r from-[#00FF85] to-[#1E90FF] bg-clip-text text-transparent">
                    Output Console
                </h2>
                <button
                    className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                        loading
                            ? "bg-[#0D0D0D] text-[#FFFFFF]/40 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] hover:from-[#00FF85]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#00FF85]/25 transform hover:-translate-y-0.5"
                    }`}
                    onClick={runCode}
                    disabled={loading}
                >
                    {loading ? "Running..." : "▶ Run Code"}
                </button>
            </div>
            <div className="h-36 overflow-y-auto bg-[#0D0D0D] p-4 rounded-lg border border-[#1E90FF]/20 mt-4 font-mono text-sm">
                {output ? (
                    <pre className="text-[#00FF85]">{output}</pre>
                ) : (
                    <p className="text-[#FFFFFF]/40">
                        No output yet... Run your code to see results.
                    </p>
                )}
            </div>
        </div>
    );
};
