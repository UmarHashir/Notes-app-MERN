import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createNote } from "../services/noteService";

function NoteModal({ isOpen, onClose, onNoteCreated }) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
    } = useForm({
        defaultValues: {
            color: "slate",
        },
    });

    const selectedColor = watch("color");

    const submitHandler = async (data) => {

        try {
            const newNote = await createNote(data);

            onNoteCreated(newNote);

            toast.success("Note created");

            reset();
            onClose();
        } catch (error) {
            toast.error("Failed to create note");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-md">

                <h2 className="text-xl font-bold mb-4">
                    Create Note
                </h2>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

                    {/* TITLE */}
                    <input
                        {...register("title", { required: true })}
                        placeholder="Title"
                        className="w-full p-3 bg-slate-800 rounded-xl"
                    />

                    {/* CATEGORY */}
                    <select
                        {...register("category")}
                        className="w-full p-3 bg-slate-800 rounded-xl"
                        defaultValue="Personal"
                    >
                        <option value="Study">Study</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Ideas">Ideas</option>
                    </select>

                    {/* ✅ COLOR PICKER */}
                    <div className="flex gap-3">
                        <input
                            type="hidden"
                            {...register("color")}
                        />
                        <button
                            type="button"
                            onClick={() => setValue("color", "blue", {
                                shouldValidate: true,
                                shouldDirty: true,
                            })}
                            className={`w-6 h-6 rounded-full bg-blue-500 ${selectedColor === "blue"
                                ? "ring-2 ring-white"
                                : ""
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() => setValue("color", "green", {
                                shouldValidate: true,
                                shouldDirty: true,
                            })}
                            className={`w-6 h-6 rounded-full bg-green-500 ${selectedColor === "green"
                                ? "ring-2 ring-white"
                                : ""
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() => setValue("color", "yellow", {
                                shouldValidate: true,
                                shouldDirty: true,
                            })}
                            className={`w-6 h-6 rounded-full bg-yellow-500 ${selectedColor === "yellow"
                                ? "ring-2 ring-white"
                                : ""
                                }`}
                        />

                        <button
                            type="button"
                            onClick={() => setValue("color", "red", {
                                shouldValidate: true,
                                shouldDirty: true,
                            })}
                            className={`w-6 h-6 rounded-full bg-red-500 ${selectedColor === "red"
                                ? "ring-2 ring-white"
                                : ""
                                }`}
                        />

                    </div>
                   

                    {/* CONTENT */}
                    <textarea
                        {...register("content", { required: true })}
                        placeholder="Write note..."
                        rows="5"
                        className="w-full p-3 bg-slate-800 rounded-xl"
                    />

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-700 rounded-xl">
                            Cancel
                        </button>

                        <button className="px-4 py-2 bg-blue-600 rounded-xl">
                            Create
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default NoteModal;