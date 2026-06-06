import { useEffect, useState } from "react";
import NoteModal from "../components/NoteModal";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { getNotes } from "../services/noteService";
import EditNoteModal from "../components/EditNoteModal";
import {
    deleteNote,
} from "../services/noteService";
import SkeletonCard from "../components/SkeletonCard";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useDebounce } from "use-debounce";


function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    const [search, setSearch] =
        useState("");

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [editNote, setEditNote] =
        useState(null);

    const [isEditOpen, setIsEditOpen] =
        useState(false);

    const [debouncedSearch] = useDebounce(search, 300);

    const { theme } = useTheme();
    const handleNoteCreated = (
        newNote
    ) => {
        setNotes((prev) => [
            newNote,
            ...prev,
        ]);

        setFilteredNotes((prev) => [
            newNote,
            ...prev,
        ]);
    };

    const handleEdit = (note) => {
        setEditNote(note);
        setIsEditOpen(true);
    };

    const handleNoteUpdated = (updated) => {
        setNotes((prev) =>
            prev.map((n) =>
                n._id === updated._id
                    ? updated
                    : n
            )
        );

        setFilteredNotes((prev) =>
            prev.map((n) =>
                n._id === updated._id
                    ? updated
                    : n
            )
        );
    };

    const handleDelete = async (id) => {
        try {
            await deleteNote(id);

            setNotes((prev) =>
                prev.filter(
                    (n) => n._id !== id
                )
            );

            setFilteredNotes((prev) =>
                prev.filter(
                    (n) => n._id !== id
                )
            );

            toast.success("Note deleted");

        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const fetchNotes = async () => {
        try {
            const data = await getNotes();

            setNotes(data);
            setFilteredNotes(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);


    useEffect(() => {
        const filtered = notes.filter((note) => {
            return (
                note.title
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase()) ||
                note.content
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase())
            );
        });

        setFilteredNotes(filtered);
    }, [debouncedSearch, notes]);


    return (
        <motion.div initial={{
            opacity: 0,
        }}
            animate={{
                opacity: 1,
            }} className={`min-h-screen transition-all duration-300 ${theme === "dark"
                ? "bg-slate-950 text-white"
                : "bg-white text-black"
                }`}>

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">

                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 w-full md:w-96"
                    />

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="
    fixed
    bottom-8
    right-8
    w-16
    h-16
    rounded-full
    bg-blue-600
    text-white
    text-3xl
    shadow-xl
    z-50
    hover:scale-110
    transition
  "
                    >
                        +
                    </button>

                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <div className="text-center py-24">

                        <div className="text-7xl mb-6">
                            📝
                        </div>

                        <h2 className="text-3xl font-bold">
                            No Notes Yet
                        </h2>

                        <p className="text-slate-400 mt-3">
                            Create your first note and start organizing your ideas.
                        </p>

                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                <NoteModal
                    isOpen={isModalOpen}
                    onClose={() =>
                        setIsModalOpen(false)
                    }
                    onNoteCreated={
                        handleNoteCreated
                    }
                />

                <EditNoteModal
                    isOpen={isEditOpen}
                    onClose={() =>
                        setIsEditOpen(false)
                    }
                    note={editNote}
                    onNoteUpdated={
                        handleNoteUpdated
                    }
                />
            </div>

        </motion.div>
    );
}

export default Dashboard;