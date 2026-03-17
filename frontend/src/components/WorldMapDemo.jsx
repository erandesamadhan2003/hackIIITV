import { motion } from "motion/react";
import { WorldMap } from "./ui/world-map.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function WorldMapDemo() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <div className="py-6 sm:py-8 bg-zinc-900/40 w-full relative rounded-xl border border-[#1E90FF]/25">
            <div className="max-w-7xl mx-auto text-center px-3 sm:px-6">
                <p className="font-bold text-2xl md:text-5xl text-white">
                    Build with people,
                    <span className="text-neutral-400">
                        {" not silos".split("").map((letter, idx) => (
                            <motion.span
                                key={idx}
                                className="inline-block"
                                initial={{ x: -8, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.35,
                                    delay: idx * 0.03,
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </span>
                </p>

                <p className="text-sm md:text-lg text-neutral-400 max-w-3xl py-5 mx-auto leading-relaxed">
                    Start coding together instantly. Create rooms, pair in
                    real-time, and keep conversations and changes in one shared
                    workspace.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs rounded-full border border-[#1E90FF]/40 bg-[#141414] text-[#FFFFFF]/80">
                        Live Sync
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full border border-[#1E90FF]/40 bg-[#141414] text-[#FFFFFF]/80">
                        Room-based Workflow
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full border border-[#1E90FF]/40 bg-[#141414] text-[#FFFFFF]/80">
                        Instant Compiler
                    </span>
                </div>

                <button
                    onClick={() =>
                        navigate(isAuthenticated ? "/joinroom" : "/login")
                    }
                    className="mb-5 px-6 py-2.5 text-sm rounded-lg bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-bold hover:opacity-95 transition-all"
                >
                    {isAuthenticated ? "Open Rooms" : "Login to Collaborate"}
                </button>

                <WorldMap
                    dots={[
                        {
                            start: { lat: 64.2008, lng: -149.4937 },
                            end: { lat: 34.0522, lng: -118.2437 },
                        },
                        {
                            start: { lat: 64.2008, lng: -149.4937 },
                            end: { lat: -15.7975, lng: -47.8919 },
                        },
                        {
                            start: { lat: -15.7975, lng: -47.8919 },
                            end: { lat: 38.7223, lng: -9.1393 },
                        },
                        {
                            start: { lat: 51.5074, lng: -0.1278 },
                            end: { lat: 28.6139, lng: 77.209 },
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 },
                            end: { lat: 43.1332, lng: 131.9113 },
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 },
                            end: { lat: -1.2921, lng: 36.8219 },
                        },
                    ]}
                />
            </div>
        </div>
    );
}
