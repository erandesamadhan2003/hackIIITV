import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { validateEmail } from "@/utils/validation";
import { toast } from "react-toastify";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/api/client";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        try {
            await login({ email, password });
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            setError(
                getApiErrorMessage(
                    error,
                    "Something went wrong. Please try again.",
                ),
            );
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-[#FFFFFF] relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#00FF85] rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#1E90FF] rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-[#FF0099] rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="w-full max-w-md bg-[#1A1A1A] p-8 rounded-2xl shadow-2xl border border-[#1E90FF]/30 backdrop-blur-sm relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-[#00FF85] to-[#1E90FF] bg-clip-text text-transparent">
                        Welcome Back
                    </h2>
                    <p className="text-center text-[#FFFFFF]/70 mb-8 font-light">
                        Sign in to continue
                    </p>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-[#FFFFFF] tracking-wide">
                                EMAIL ADDRESS
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1E90FF]/50 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-[#00FF85] transition-all duration-300 shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-[#FFFFFF] tracking-wide">
                                PASSWORD
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1E90FF]/50 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-[#00FF85] transition-all duration-300 shadow-inner"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-bold hover:from-[#00FF85]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#00FF85]/25 transform hover:-translate-y-1 transition-all duration-300 tracking-wide mt-2"
                        >
                            Login
                        </button>
                    </form>

                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1E90FF]/50 to-transparent"></div>
                        <span className="px-4 text-[#FFFFFF]/60 text-sm font-medium tracking-widest">
                            OR
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#1E90FF]/50 to-transparent"></div>
                    </div>

                    <p className="text-center text-[#FFFFFF]/70">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#FF0099] font-medium hover:text-[#00FF85] hover:underline transition-all duration-200"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
