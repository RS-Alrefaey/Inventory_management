import { useState, useRef, useEffect } from "react";
import { useData } from "../contexts/DataContext";

export default function NotificationBell() {
  const { productList } = useData();
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const lowStock = productList.filter((p) => p.stock > 0 && p.stock < 10 && p.active);
  const outOfStock = productList.filter((p) => p.stock === 0 && p.active);

  const alerts = [
    ...lowStock.map((p) => ({
      id: p.id,
      type: "low",
      text: `${p.name} — low stock`,
    })),
    ...outOfStock.map((p) => ({
      id: p.id,
      type: "out",
      text: `${p.name} — out of stock`,
    })),
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-blue-900 dark:text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V9a6 6 0 10-12 0v5c0 .386-.146.735-.405 1.005L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {alerts.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
            {alerts.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-4 py-2 font-semibold text-blue-900 dark:text-slate-200 border-b dark:border-slate-700">
            Notifications
          </div>

          {alerts.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
              All stocks are fine 🎉
            </div>
          ) : (
            <ul className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
              {alerts.map((a) => (
                <li
                  key={a.id}
                  className={`px-4 py-2 text-sm ${
                    a.type === "low"
                      ? "text-yellow-700 bg-yellow-50 dark:bg-yellow-900/30"
                      : "text-red-700 bg-red-50 dark:bg-red-900/30"
                  }`}
                >
                  {a.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
