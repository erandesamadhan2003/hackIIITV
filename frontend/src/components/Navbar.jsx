import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="w-full bg-[#1A1A1A]/95 backdrop-blur-md shadow-lg px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-[#1E90FF]/30 fixed top-0 left-0 z-50">
            {/* Left Section - Brand Logo */}
            <div className="flex items-center">
                <Link
                    to="/"
                    className="font-bold text-base sm:text-xl bg-gradient-to-r from-[#00FF85] to-[#1E90FF] bg-clip-text text-transparent hover:from-[#00FF85]/80 hover:to-[#1E90FF]/80 transition-all duration-300 whitespace-nowrap"
                >
                    <strong className="text-xl sm:text-2xl">CoCode:</strong>{" "}
                    Collaborative
                    <span className="hidden sm:inline"> Code Editor</span>
                </Link>
            </div>

            {/* Center Section - Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                {/* Home link - accessible to all users */}
                <Link
                    to="/"
                    className="text-lg text-[#FFFFFF]/70 hover:text-[#00FF85] transition-all duration-200 font-medium tracking-wide hover:scale-105"
                >
                    Home
                </Link>

                {/* Protected routes - only show when logged in */}
                {isAuthenticated && (
                    <Link
                        to="/joinroom"
                        className="text-lg text-[#FFFFFF]/70 hover:text-[#00FF85] transition-all duration-200 font-medium tracking-wide hover:scale-105"
                    >
                        Join Room
                    </Link>
                )}
            </div>

            {/* Right Section - Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
                {!isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-sm text-[#00FF85] hover:text-[#00FF85]/80 font-medium transition-all duration-200 hover:scale-105 px-3 py-2 rounded-lg hover:bg-[#00FF85]/10"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="text-sm bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] px-6 py-2.5 rounded-lg font-bold hover:from-[#00FF85]/90 hover:to-[#1E90FF]/90 hover:shadow-lg hover:shadow-[#00FF85]/25 transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-[#FFFFFF]/60 font-medium">
                            Welcome{user?.username ? `, ${user.username}` : ""}!
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-sm bg-gradient-to-r from-[#FF0099] to-red-500 text-[#FFFFFF] px-6 py-2.5 rounded-lg font-bold hover:from-[#FF0099]/90 hover:to-red-500/90 hover:shadow-lg hover:shadow-[#FF0099]/25 transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden p-2 rounded-lg border border-[#1E90FF]/30 text-[#FFFFFF]/80"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute left-0 top-full w-full border-b border-[#1E90FF]/30 bg-[#141414]/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-xl">
                    <Link
                        to="/"
                        className="block text-[#FFFFFF]/80 hover:text-[#00FF85]"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    {isAuthenticated && (
                        <Link
                            to="/joinroom"
                            className="block text-[#FFFFFF]/80 hover:text-[#00FF85]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Join Room
                        </Link>
                    )}

                    {!isAuthenticated ? (
                        <div className="flex gap-3 pt-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-lg border border-[#00FF85]/30 text-[#00FF85]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FF85] to-[#1E90FF] text-[#0D0D0D] font-semibold"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="pt-2 flex items-center justify-between gap-3">
                            <span className="text-sm text-[#FFFFFF]/60">
                                Hi{user?.username ? `, ${user.username}` : ""}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF0099] to-red-500 text-[#FFFFFF] text-sm font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
