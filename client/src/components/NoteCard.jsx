import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";


function NoteCard({ note, onEdit, onDelete }) {
    const { theme } = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className={`bg-slate-900 border-l-4 rounded-2xl p-5 ${note.color === "blue"
                    ? "border-blue-500"
                    : note.color === "green"
                        ? "border-green-500"
                        : note.color === "yellow"
                            ? "border-yellow-500"
                            : note.color === "red"
                                ? "border-red-500"
                                : "border-slate-500"
                }`}
        >
            {/* CATEGORY */}
            <span className="text-xs px-2 py-1 bg-slate-800 rounded-full text-slate-300">
                {note.category}
            </span>

            {/* TITLE */}
            <h2
                className={`font-bold text-lg mb-2 ${theme === "dark"
                        ? "text-white"
                        : "text-white"
                    }`}
            >
                {note.title}
            </h2>

            {/* CONTENT */}
            <p className="text-slate-400 line-clamp-3">
                {note.content}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onEdit(note)}
                    className="p-2 bg-blue-600 rounded-lg"
                >
                    <Pencil size={18} />
                </button>

                <button
                    onClick={() => onDelete(note._id)}
                    className="p-2 bg-red-600 rounded-lg"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </motion.div>
    );
}

export default NoteCard;