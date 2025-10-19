import { useContext, createContext, useState, useEffect } from "react";

export const NAV_VALUES = [
  "Dashboard",
  "Products",
  "Orders",
  "Promos",
] as const;

export type NavValues = (typeof NAV_VALUES)[number];
type NavContextType = {
  current: NavValues;
  navTo: (next: NavValues) => void;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<NavValues>("Dashboard");

  useEffect(() => {
    const saved = localStorage.getItem("nav");
    saved && setCurrent(saved as NavValues);
  }, []);

  const navTo = (next: NavValues) => {
    setCurrent(next);
    localStorage.setItem("nav", next);
  };

  return (
    <NavContext.Provider value={{ current, navTo }}>
      {children}
    </NavContext.Provider>
  );
}

export default NavProvider;

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within <NavContextProvider>");
  return ctx;
}
