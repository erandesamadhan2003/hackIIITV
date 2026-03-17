import { Compare } from "@/components/ui/compare";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function CompareDemo() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <div className="p-4 sm:p-6 bg-[#0D0D0D] border border-[#1E90FF]/30 rounded-xl flex flex-col lg:flex-row gap-6 lg:gap-10 items-center relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#00FF85] rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#1E90FF] rounded-full blur-3xl"></div>
            </div>

            <Compare
                firstImage="https://assets.aceternity.com/code-problem.png"
                secondImage="https://assets.aceternity.com/code-solution.png"
                firstImageClassName="object-cover object-left-top"
                secondImageClassName="object-cover object-left-top"
                className="mx-auto my-2 h-[260px] w-[220px] sm:h-[380px] sm:w-[380px] lg:h-[470px] lg:w-[470px] rounded-xl border border-[#1E90FF]/30 shadow-lg relative z-10"
                slideMode="drag"
            />

            <div className="w-full lg:w-[58%] py-2 sm:py-4 px-1 sm:px-2 flex flex-col items-start lg:items-end relative z-10">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl text-left lg:text-right font-bold bg-gradient-to-r from-[#00FF85] to-[#1E90FF] bg-clip-text text-transparent mb-3">
                    Debug less alone.
                </h2>

                <p className="text-lg sm:text-2xl text-left lg:text-right text-[#FFFFFF]/80 py-2 font-light">
                    Collaborate on code in real time.
                </p>

                <p className="text-sm sm:text-base text-left lg:text-right text-[#FFFFFF]/60 py-4 leading-relaxed font-light max-w-2xl">
                    Move from bug to fix faster with a shared workspace. Use
                    rooms to pair program, explain context instantly, and run
                    code without switching tools.
                </p>

                <button
                    className="mt-3 lg:ml-auto px-7 py-3 text-sm sm:text-base rounded-xl bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-bold hover:from-[#00FF85]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#00FF85]/25 transform hover:-translate-y-1 transition-all duration-300 tracking-wide"
                    onClick={() =>
                        navigate(isAuthenticated ? "/joinroom" : "/signup")
                    }
                >
                    {isAuthenticated ? "GO TO ROOM" : "CREATE ACCOUNT"}
                </button>
            </div>
        </div>
    );
}
