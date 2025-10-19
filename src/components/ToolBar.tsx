import React from "react";
import Title from "./Title";
import Button from "./Button";

interface ToolbarProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  onDelete: () => void;
  disableDelete?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  title,
  searchValue,
  onSearchChange,
  onAdd,
  onDelete,
  disableDelete = false,
}) => {
  return (
    <div className="flex justify-between my-5 gap-3 items-center bg-white p-2 border-l-2 border-blue-900 dark:border-purple-400 rounded-r-xl dark:bg-slate-800 dark:text-slate-300">
      <Title text={title} />
      <input
        type="text"
        className="border bg-white w-full focus:outline-none focus:border-1 focus:outline-1 
          placeholder:pl-3 h-10 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-900
          dark:bg-slate-800 dark:border-slate-600 dark:focus:ring-slate-500
          "
        placeholder="Search"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="flex gap-4">
        <Button text="+" action={onAdd} />
        <button
          type="button"
          disabled={disableDelete}
          onClick={onDelete}
          className="hover:cursor-pointer rounded-3xl bg-slate-100 dark:bg-slate-700 px-4 md:px-6 py-2 font-semibold text-blue-900 dark:text-slate-200 disabled:opacity-40"
        >
          <span className="hidden sm:inline">
            {title === "Products" ? "Deactivate" : "Delete"}
          </span>
          <span className="sm:hidden">-</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
