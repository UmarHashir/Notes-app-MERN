import { LogOut, StickyNote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className={`border-b transition-all duration-300 ${theme === "dark"
                ? "bg-slate-900 border-slate-800 text-white"
                : "bg-white border-gray-200 text-black"
            }`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <div className="flex items-center gap-2">
                    <StickyNote />
                    <h1 className="font-bold text-xl">
                        Notes App
                    </h1>
                </div>

                <div className="flex items-center gap-4">

                    <button
                        onClick={toggleTheme}
                        className="p-2 bg-slate-800 rounded-lg"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon  size={18} />}
                    </button>
                    <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 p-2 rounded-xl transition">

                        <div
                            onClick={() => navigate("/profile")}
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                        >
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center uppercase font-bold">
                                {user?.name?.charAt(0)}
                            </div>

                            <div className="hidden md:block">
                                <p className="text-sm font-semibold">
                                    {user?.name}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;