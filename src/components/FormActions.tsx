type FormActionsProps = {
  onSave: (e?: React.FormEvent) => void;
  onDelete?: () => void;
  onCancel: () => void;
  showDelete?: boolean;
};

export default function FormActions({
  onSave,
  onDelete,
  onCancel,
  showDelete,
}: FormActionsProps) {
  return (
    <div className="flex justify-start gap-2 pt-2">
      <button
        type="submit"
        onClick={onSave}
        className="px-3 py-2 rounded bg-blue-900 text-white dark:bg-purple-400"
      >
        Save
      </button>

      {showDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="px-3 py-2 border rounded dark:border-slate-200 dark:text-slate-200"
        >
          Delete
        </button>
      )}

      <button
        type="button"
        onClick={onCancel}
        className="px-3 py-2 border rounded dark:border-slate-200 dark:text-slate-200"
      >
        Cancel
      </button>
    </div>
  );
}
