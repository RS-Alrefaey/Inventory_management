import React from "react";

interface DataTableProps<T> {
  columns: string[];
  rows: T[];
  rowKey: (row: T) => string;
  renderRow: (row: T) => React.ReactNode;
  selected: Set<string>;
  toggleOne: (id: string) => void;
  toggleAll: () => void;
  allSelected: boolean;
  onRowClick?: (row: T) => void;
}

function DataTable<T>({
  columns,
  rows,
  rowKey,
  renderRow,
  selected,
  toggleOne,
  toggleAll,
  allSelected,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="rounded-2xl bg-white shadow-sm dark:bg-slate-800 overflow-hidden overflow-x-auto">
      <table className="w-full min-w-[400px] border-collapse">
        <thead className="bg-slate-50 text-blue-900 font-medium dark:bg-slate-900/40 dark:text-slate-300">
          <tr>
            <th className="text-center w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
              />
            </th>

            {columns.map((col) => (
              <th
                key={col}
                className={`px-4 py-3 text-left ${
                  col === "SKU" ? "hidden md:table-cell" : ""
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-left ">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-8 text-slate-500 text-center dark:text-slate-300"
              >
                No data yet
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={rowKey(row)}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/40 dark:text-slate-300"
                onClick={() => onRowClick?.(row)}
              >
                <td className="text-center ">
                  <input
                    type="checkbox"
                    checked={selected.has(rowKey(row))}
                    onChange={() => toggleOne(rowKey(row))}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>

                {renderRow(row)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
