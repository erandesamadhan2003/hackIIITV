import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/validation";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/api/client";

export const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { signup, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setMessage("");
            return;
        }

        try {
            await signup({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            toast.success("Signup successful!");
            navigate("/");
        } catch (err) {
            setError(
                getApiErrorMessage(err, "Signup failed. Please try again."),
            );
        }
    };

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
                        Create Account
                    </h2>
                    <p className="text-center text-[#FFFFFF]/70 mb-8 font-light">
                        Join the digital workspace
                    </p>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}
                    {message && (
                        <div className="mb-4 p-3 rounded-lg bg-[#00FF85]/10 border border-[#00FF85]/50">
                            <p className="text-[#00FF85] text-sm">{message}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-[#FFFFFF] tracking-wide">
                                USERNAME
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1E90FF]/50 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-[#00FF85] transition-all duration-300 shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-[#FFFFFF] tracking-wide">
                                EMAIL ADDRESS
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1E90FF]/50 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-[#00FF85] transition-all duration-300 shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-[#FFFFFF] tracking-wide">
                                CONFIRM PASSWORD
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Confirm your password"
                                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1E90FF]/50 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-[#00FF85] transition-all duration-300 shadow-inner"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-bold hover:from-[#00FF85]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#00FF85]/25 transform hover:-translate-y-1 transition-all duration-300 tracking-wide mt-6"
                        >
                            CREATE ACCOUNT
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
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#FF0099] font-medium hover:text-[#00FF85] hover:underline transition-all duration-200"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
