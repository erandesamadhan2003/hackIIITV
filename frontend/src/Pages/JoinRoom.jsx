import { motion } from "framer-motion";
import { ColourfulText } from "../components/ui/colourful-text";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { roomService } from "@/services/room.service";
import { useRooms } from "@/hooks/useRooms";
import { getApiErrorMessage } from "@/api/client";

export const JoinRoom = () => {
    const { user } = useAuth();
    const [roomName, setRoomName] = useState("");
    const [enteredRoomId, setenteredRoomId] = useState("");
    const { rooms, refreshRooms } = useRooms(user?.id);
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        if (!roomName.trim()) {
            toast.error("Room name cannot be empty!");
            return;
        }
        if (!user?.id) {
            toast.error("Please login again.");
            return;
        }

        const roomId = uuidv4();
        const newRoom = {
            roomId,
            roomName,
            ownerId: user.id,
            collaborators: [],
        };

        try {
            await roomService.createRoom(newRoom);
            toast.success("Room created Successfully!");
            await refreshRooms();
            navigate(`/editor/${roomId}`);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Error creating room"));
        }
    };

    const handleRoomJoin = async () => {
        if (!enteredRoomId) {
            toast.error("Enter Room ID");
            return;
        }
        if (!user?.id) {
            toast.error("Please login again.");
            return;
        }

        const userId = user.id;
        try {
            await roomService.joinRoom(enteredRoomId, userId);
            toast.success("Joined room successfully!");
            await refreshRooms();
            navigate(`/editor/${enteredRoomId}`);
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to join room"));
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-[#0D0D0D] px-4 py-8">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#00FF85] rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#1E90FF] rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-[#FF0099] rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="relative w-full max-w-4xl flex flex-col items-center gap-8 text-center z-10 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFFFFF] font-sans">
                            Welcome{" "}
                            <ColourfulText text={user?.username || ""} />
                        </h1>
                    </motion.div>

                    <motion.p
                        className="text-[#FFFFFF]/70 text-lg md:text-xl max-w-xl font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Create a room to start collaborating, or join an
                        existing one using a Room ID.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center gap-6 mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Create Room Dialog */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="px-8 py-3 text-lg rounded-xl bg-gradient-to-r from-[#FF0099] to-[#1E90FF] text-[#FFFFFF] font-bold hover:from-[#FF0099]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#FF0099]/25 transform hover:-translate-y-1 transition-all duration-300 tracking-wide">
                                    CREATE ROOM
                                </button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#1A1A1A] border border-[#1E90FF]/30 text-[#FFFFFF] sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#00FF85] to-[#1E90FF] bg-clip-text text-transparent">
                                        Create a New Room
                                    </DialogTitle>
                                </DialogHeader>
                                <Input
                                    placeholder="Enter room name"
                                    value={roomName}
                                    onChange={(e) =>
                                        setRoomName(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1E90FF]/50 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-[#00FF85] transition-all duration-300"
                                />
                                <DialogFooter>
                                    <button
                                        onClick={handleCreateRoom}
                                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-bold hover:from-[#00FF85]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#00FF85]/25 transform hover:-translate-y-1 transition-all duration-300 tracking-wide"
                                    >
                                        CREATE
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Join Room Dialog */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="px-8 py-3 text-lg rounded-xl bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-bold hover:from-[#00FF85]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#00FF85]/25 transform hover:-translate-y-1 transition-all duration-300 tracking-wide">
                                    JOIN ROOM
                                </button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#1A1A1A] border border-[#1E90FF]/30 text-[#FFFFFF] sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#00FF85] to-[#1E90FF] bg-clip-text text-transparent">
                                        Join a Room
                                    </DialogTitle>
                                </DialogHeader>
                                <Input
                                    placeholder="Enter Room ID"
                                    value={enteredRoomId}
                                    onChange={(e) =>
                                        setenteredRoomId(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1E90FF]/50 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-[#00FF85] transition-all duration-300"
                                />
                                <DialogFooter>
                                    <button
                                        onClick={handleRoomJoin}
                                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-bold hover:from-[#00FF85]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#00FF85]/25 transform hover:-translate-y-1 transition-all duration-300 tracking-wide"
                                    >
                                        JOIN
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </motion.div>
                </div>

                {/* Rooms Grid */}
                {rooms.length > 0 && (
                    <motion.div
                        className="w-full max-w-6xl flex flex-col items-center justify-center mt-16 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00FF85] to-[#1E90FF] bg-clip-text text-transparent">
                            Your Joined Rooms
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4">
                            {rooms.map((room) => (
                                <div
                                    key={room._id}
                                    onClick={() =>
                                        navigate(`/editor/${room.room_id}`)
                                    }
                                    className="bg-[#1A1A1A] border border-[#1E90FF]/30 shadow-lg p-6 rounded-2xl cursor-pointer transform hover:scale-105 hover:border-[#00FF85]/50 hover:shadow-[#00FF85]/20 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <h3 className="text-2xl font-bold mb-2 text-[#FFFFFF]">
                                        {room.room_name}
                                    </h3>
                                    <p className="text-sm text-[#FFFFFF]/60">
                                        Owner:{" "}
                                        <span className="text-[#00FF85]">
                                            {room.owner?.email}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    );
};
