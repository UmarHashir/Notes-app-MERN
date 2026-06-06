function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

      <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          Delete Note?
        </h2>

        <p className="text-slate-400 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;