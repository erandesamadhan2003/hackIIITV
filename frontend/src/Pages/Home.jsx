import { CompareDemo } from "@/components/CompareDemo";
import { WorldMapDemo } from "@/components/WorldMapDemo";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden text-[#FFFFFF]">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#00FF85] rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#1E90FF] rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-[#FF0099] rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <Navbar />

            <div className="pt-28 pb-14 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="text-center mb-12">
                    <p className="inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-1.5 rounded-full border border-[#1E90FF]/40 bg-[#111111]/60 text-[#FFFFFF]/80">
                        Real-time collaboration • Rooms • Compiler
                    </p>

                    <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-[#00FF85] via-[#1E90FF] to-[#FF0099] bg-clip-text text-transparent">
                        Ship code faster together
                    </h1>

                    <p className="mt-5 text-sm sm:text-lg text-[#FFFFFF]/70 max-w-3xl mx-auto leading-relaxed">
                        Create a room, code in sync, debug with your team, and
                        run programs instantly. No setup friction — just
                        collaborative flow.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() =>
                                navigate(
                                    isAuthenticated ? "/joinroom" : "/signup",
                                )
                            }
                            className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-bold hover:opacity-95 hover:shadow-lg hover:shadow-[#00FF85]/30 transition-all"
                        >
                            {isAuthenticated ? "Go to Rooms" : "Get Started"}
                        </button>
                        <button
                            onClick={() => navigate("/joinroom")}
                            className="px-7 py-3 rounded-xl border border-[#1E90FF]/40 bg-[#141414]/80 text-[#FFFFFF] font-semibold hover:border-[#00FF85]/70 hover:text-[#00FF85] transition-all"
                        >
                            Join a Room
                        </button>
                    </div>
                </section>

                <section className="rounded-2xl border border-[#1E90FF]/25 bg-[#111111]/55 backdrop-blur-sm p-3 sm:p-5 shadow-xl shadow-black/20">
                    <WorldMapDemo />
                </section>

                <section className="mt-8 rounded-2xl border border-[#1E90FF]/25 bg-[#111111]/55 backdrop-blur-sm p-3 sm:p-5 shadow-xl shadow-black/20">
                    <CompareDemo />
                </section>
            </div>
        </div>
    );
};
