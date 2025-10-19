type FormFieldProps = {
  label: string;
  type?: "text" | "number" | "date" | "select";
  value: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: string[] | { value: string; label: string }[];
  labelPosition?: "left" | "top";
  className?: string;
};
export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  options = [],
  labelPosition = "left",
  className = "",
}: FormFieldProps) {
  return (
    <div
      className={`${ 
        labelPosition === "top"
          ? "flex flex-col gap-1"
          : "flex items-center gap-4 "
      } ${className}`}
    >
      <span className="text-sm mb-1 font-semibold dark:text-slate-300 min-w-20">
        {label}
      </span>
      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 border-gray-300 dark:text-slate-300
                     focus:outline-none focus:ring-1 focus:ring-blue-900"
        >
          {options?.map((opt) => {
            if (typeof opt === "string") {
              return (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              );
            }
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 border-gray-300 
                   focus:outline-none focus:ring-1 focus:ring-blue-900 dark:text-slate-300"
        />
      )}
    </div>
  );
}
