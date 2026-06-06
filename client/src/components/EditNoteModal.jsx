import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { updateNote } from "../services/noteService";

function EditNoteModal({
  isOpen,
  onClose,
  note,
  onNoteUpdated,
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        content: note.content,
      });
    }
  }, [note, reset]);

  const submitHandler = async (data) => {
    try {
      const updated =
        await updateNote(note._id, data);

      onNoteUpdated(updated);

      toast.success("Note updated");

      onClose();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 w-full max-w-lg p-6 rounded-3xl border border-slate-800">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            Edit Note
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(
            submitHandler
          )}
          className="space-y-4"
        >

          <input
            {...register("title")}
            className="w-full p-3 bg-slate-800 rounded-xl"
          />

          <textarea
            rows="6"
            {...register("content")}
            className="w-full p-3 bg-slate-800 rounded-xl"
          />

          <button className="w-full bg-blue-600 py-3 rounded-xl">
            Update Note
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditNoteModal;