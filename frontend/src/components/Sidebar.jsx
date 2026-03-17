import { useState, useEffect } from "react";
import { FaUpload, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { MdDeleteForever } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { roomService } from "@/services/room.service";
import { fileService } from "@/services/file.service";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/api/client";

export const Sidebar = ({
    roomId,
    setCode,
    code,
    language,
    activeFile,
    setActiveFile,
}) => {
    const [files, setFiles] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [collaborators, setCollaborators] = useState([]);
    const [newFilename, setNewFilename] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    // ! Fetched Collaborator
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const data = await roomService.getRoomDetails(roomId);
                setRoomName(data.room_name);
                setCollaborators(data.collaborators);
            } catch (error) {
                toast.error(
                    getApiErrorMessage(error, "Error fetching room data"),
                );
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    // ! Fetched Files
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const data = await fileService.getFiles(roomId);
                setFiles(data.files);
            } catch (error) {
                toast.error(getApiErrorMessage(error, "Error fetching files"));
            }
        };

        fetchFiles();
    }, [roomId]);

    // Handles file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (!user?.id) {
            toast.error("Please login again.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const fileContent = e.target.result;
            try {
                const data = await fileService.uploadFile({
                    filename: file.name,
                    content: fileContent,
                    owner: user.id,
                    roomId,
                });

                toast.success("File uploaded successfully!");
                setFiles((prevFiles) => [...prevFiles, data.savedFile]);
                setActiveFile(data.savedFile._id);
                setCode(fileContent);
            } catch (error) {
                toast.error(getApiErrorMessage(error, "File upload failed"));
            }
        };
        reader.readAsText(file);
    };

    //Handles file selection
    const handleFileClick = async (file) => {
        try {
            const data = await fileService.getFileById(file._id);
            setActiveFile(data.file._id);
            setCode(data.file.content);
        } catch (error) {
            toast.error(
                getApiErrorMessage(error, "Failed to fetch single file"),
            );
        }
    };

    // Function to handle file download
    const handleDownload = () => {
        console.log("Code to download:", code);
        if (!code) {
            alert("No code to download!");
            return;
        }

        const blob = new Blob([code], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        const extension =
            language === "javascript"
                ? "js"
                : language === "python"
                  ? "py"
                  : language === "c"
                    ? "c"
                    : language === "cpp"
                      ? "cpp"
                      : "txt";

        link.download = `code.${extension}`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    // create New File
    const handleCreateFile = async () => {
        if (!newFilename.trim()) {
            toast.error("Filename cannot be empty!");
            return;
        }
        if (!user?.id) {
            toast.error("Please login again.");
            return;
        }

        try {
            const data = await fileService.createFile({
                filename: newFilename,
                content: "",
                owner: user.id,
                roomId,
            });
            toast.success("File created successfully!");
            setFiles((prevFiles) => [...prevFiles, data.savedFile]);
            setNewFilename("");
            setCode("");
            setActiveFile(data.savedFile._id);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Error creating file"));
        }
    };

    const handleDeleteFile = async (fileId) => {
        if (!fileId) {
            console.error("No file ID provided.");
            return;
        }

        try {
            await fileService.deleteFile(fileId);

            toast.success("File deleted successfully");

            setFiles((prevFiles) =>
                prevFiles.filter((file) => file._id !== fileId),
            );
            setCode("");
            setActiveFile(null);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Error deleting file"));
        }
    };

    return (
        <div className="w-64 h-full bg-[#1A1A1A] text-[#FFFFFF] flex flex-col p-4 border-r border-[#1E90FF]/30 shadow-lg">
            <div className="flex justify-between">
                <h2 className="text-2xl font-extrabold mb-4 tracking-wide bg-gradient-to-r from-[#00FF85] to-[#1E90FF] bg-clip-text text-transparent">
                    CoCode
                </h2>
                <p
                    className="text-xl font-bold text-[#FF0099] hover:text-red-500 cursor-pointer transition-all duration-200"
                    onClick={() => navigate("/joinroom")}
                >
                    Exit
                </p>
            </div>
            <h3 className="text-lg font-medium text-[#FFFFFF]/80 mb-4">
                <span className="text-[#FFFFFF]/50">Room:</span> {roomName}
            </h3>

            <div className="flex justify-around gap-2">
                <label className="flex items-center justify-center bg-gradient-to-r from-[#1E90FF] to-[#00FF85] text-[#0D0D0D] py-2 px-3 rounded-lg mb-4 hover:from-[#1E90FF]/90 hover:to-[#00FF85]/90 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#00FF85]/25 hover:-translate-y-0.5">
                    <FaUpload />
                    <input
                        type="file"
                        accept=".c,.cpp,.js,.py"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </label>

                <button
                    className="bg-gradient-to-r from-[#1E90FF] to-[#00FF85] text-[#0D0D0D] px-3 py-2 rounded-lg mb-4 shadow-lg hover:from-[#1E90FF]/90 hover:to-[#00FF85]/90 hover:shadow-[#00FF85]/25 hover:-translate-y-0.5 transition-all duration-200"
                    onClick={handleDownload}
                >
                    <FaDownload />
                </button>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="bg-gradient-to-r from-[#1E90FF] to-[#00FF85] text-[#0D0D0D] px-3 py-2 rounded-lg mb-4 shadow-lg hover:from-[#1E90FF]/90 hover:to-[#00FF85]/90 hover:shadow-[#00FF85]/25 hover:-translate-y-0.5 transition-all duration-200">
                            <IoIosCreate />
                        </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md bg-[#1A1A1A] text-[#FFFFFF] border border-[#1E90FF]/30 shadow-lg rounded-lg">
                        <DialogHeader>
                            <DialogTitle className="text-[#FFFFFF] text-xl font-bold bg-gradient-to-r from-[#00FF85] to-[#1E90FF] bg-clip-text text-transparent">
                                Create New File
                            </DialogTitle>
                        </DialogHeader>

                        <Input
                            className="mt-2 px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1E90FF]/50 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-[#00FF85] transition-all duration-300"
                            placeholder="Enter file name (e.g., main.js)"
                            value={newFilename}
                            onChange={(e) => setNewFilename(e.target.value)}
                        />

                        <DialogFooter className="mt-4">
                            <button
                                onClick={handleCreateFile}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-bold hover:from-[#00FF85]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#00FF85]/25 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                CREATE
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto mt-2 space-y-1">
                {files.map((file) => (
                    <div
                        key={file._id}
                        className="flex items-center justify-between group"
                    >
                        <div
                            className={`text-sm py-2 px-3 rounded-lg w-full cursor-pointer transition-all duration-200
                ${
                    activeFile === file._id
                        ? "bg-gradient-to-r from-[#00FF85]/20 to-[#1E90FF]/20 border border-[#00FF85]/50 text-[#00FF85] font-semibold shadow-lg shadow-[#00FF85]/10"
                        : "hover:bg-[#0D0D0D] text-[#FFFFFF]/70 hover:text-[#FFFFFF] border border-transparent"
                }`}
                            onClick={() => handleFileClick(file)}
                        >
                            📄 {file.filename}
                        </div>

                        <MdDeleteForever
                            size={22}
                            className="text-[#FF0099] hover:text-red-500 cursor-pointer ml-2 transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                            onClick={() => handleDeleteFile(file._id)}
                        />
                    </div>
                ))}
            </div>

            {/* Room Info */}
            <div
                className="mt-4 p-3 bg-[#0D0D0D] rounded-lg text-sm cursor-pointer border border-[#1E90FF]/30 hover:border-[#00FF85]/50 transition-all duration-200"
                onClick={() => navigator.clipboard.writeText(roomId)}
                onClickCapture={() => toast.success("Copied to clipboard")}
            >
                <p className="text-[#FFFFFF]/80">
                    🔑 <strong className="text-[#00FF85]">Room ID:</strong>{" "}
                    <span className="text-[#FFFFFF]/60">{roomId}</span>
                </p>
            </div>

            {/* Collaborators */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2 tracking-wide">
                    Collaborators
                </h3>
                {collaborators.length > 0 ? (
                    collaborators.map((user, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 mb-2 p-2 rounded-lg bg-[#0D0D0D] border border-[#1E90FF]/20"
                        >
                            <div className="w-3 h-3 rounded-full bg-[#00FF85] animate-pulse shadow-lg shadow-[#00FF85]/50"></div>
                            <p className="text-sm text-[#FFFFFF]/80">
                                {user.name}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-[#FFFFFF]/40">
                        No collaborators yet
                    </p>
                )}
            </div>
        </div>
    );
};
