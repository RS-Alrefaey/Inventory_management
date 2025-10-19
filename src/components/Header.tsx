import { useDarkMode } from "../contexts/DarkModeContext";
import { Sun, Moon } from "lucide-react";
import Navbar from "../components/Navbar";
import { HomeIcon } from "./icons";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <header className="flex items-center justify-between border-b-1 border-slate-800 dark:border-gray-300 box-border w-full px-4 sm:px-6 md:px-10 py-5 dark:bg-slate-900  ">
      <div className="flex gap-2 items-center">
        <HomeIcon color={isDark ? "#c084fc" : "#1e3a8a"} size={30} />
        <span className="font-bold text-blue-900  text-lg dark:text-gray-300  sm:text-2xl md:text-3xl">
          X Market
        </span>
      </div>

      <div className="flex justify-end items-center gap-2">
        <Navbar />
        <button
          onClick={toggleDarkMode}
          className="py-3 px-5 rounded-full transition hover:bg-blue-100 dark:hover:bg-slate-800"
        >
          {isDark ? (
            <Sun className="h-6 w-6 text-purple-400" />
          ) : (
            <Moon className="h-6 w-6 text-blue-900" />
          )}
        </button>
        <NotificationBell />
      </div>
    </header>
  );
}
