import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Code } from "@/components/Code.jsx";
import { OutputConsole } from "@/components/Output.jsx";
import { Sidebar } from "@/components/Sidebar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSocketRoom } from "@/hooks/useSocketRoom";
import { fileService } from "@/services/file.service";
import { getApiErrorMessage } from "@/api/client";
import { toast } from "react-toastify";

export const CodeEditor = () => {
    const { roomId } = useParams();
    const [code, setCode] = useState("// Write your code here...");
    const [language, setLanguage] = useState("javascript");
    const [message, setMessage] = useState("");
    const [activeFile, setActiveFile] = useState("");
    const { user } = useCurrentUser();
    const { messages, sendMessage, emitCodeUpdate, listenCodeUpdates } =
        useSocketRoom(roomId, activeFile);

    useEffect(() => {
        const unsubscribe = listenCodeUpdates(setCode);
        return unsubscribe;
    }, [listenCodeUpdates]);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        emitCodeUpdate(newCode);

        if (activeFile) {
            fileService.updateFile(activeFile, newCode).catch((error) => {
                toast.error(getApiErrorMessage(error, "Error updating file"));
            });
        }
    };

    const handleSendButton = () => {
        if (message.trim() && user) {
            sendMessage({
                roomId,
                username: user.username,
                message,
            });
            setMessage("");
        }
    };

    return (
        <div className="flex h-screen bg-zinc-900 overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                roomId={roomId}
                setCode={setCode}
                code={code}
                language={language}
                activeFile={activeFile}
                setActiveFile={setActiveFile}
            />

            {/* Code Editor + Output Section */}
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex-1 h-64 overflow-auto">
                    <Code
                        code={code}
                        setCode={handleCodeChange}
                        language={language}
                        setLanguage={setLanguage}
                    />
                </div>

                <div className="h-64 p-3">
                    <OutputConsole code={code} language={language} />
                </div>
            </div>

            {/* Chat Box */}
            <div className="w-80 border-l border-gray-700 bg-zinc-900 flex flex-col">
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-lg text-white font-semibold">
                        💬 ChatBox
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto bg-zinc-800 p-3">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className="text-white text-sm mb-2 break-words"
                        >
                            <span className="text-blue-400 font-semibold">
                                {msg.username}:
                            </span>{" "}
                            <span className="text-gray-200">{msg.message}</span>
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t border-gray-700 bg-zinc-900">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 p-2 bg-zinc-800 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSendButton()
                            }
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSendButton}
                            disabled={!user}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
