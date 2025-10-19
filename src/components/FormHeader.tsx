import { Dialog } from "@headlessui/react";

type FormHeaderProps = {
  title: string;
  onClose: () => void;
  resetForm?: () => void;
};

export default function FormHeader({
  title,
  onClose,
  resetForm,
}: FormHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-400">
      <Dialog.Title className="font-semibold text-blue-900 text-lg dark:text-slate-300">
        {title}
      </Dialog.Title>

      <button
        className="dark:text-slate-300"
        type="button"
        onClick={() => {
          resetForm?.();
          onClose();
        }}
      >
        ✕
      </button>
    </div>
  );
}
