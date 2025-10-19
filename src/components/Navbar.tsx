import MobileSidebar from "./MobileSidebar";
import { type NavValues, useNav } from "../contexts/NavContext";
import { useDarkMode } from "../contexts/DarkModeContext";

import {
  DashIcon,
  ProductIcon,
  OrderIcon,
  PromoIcon,
} from "../components/icons/index";

const Navbar = () => {
  const { current, navTo } = useNav();
  const { isDark } = useDarkMode();
  const NAV_ITEMS = [
    { item: "Dashboard", Icon: DashIcon },
    { item: "Products", Icon: ProductIcon },
    { item: "Orders", Icon: OrderIcon },
    { item: "Promos", Icon: PromoIcon },
  ];

  return (
    <>
      <div className="flex justify-between ">
        <div className="flex">
          <div className="hidden [@media(min-width:1050px)]:flex w-full">
            <ul className="flex gap-8 text-lg text-gray-500 ">
              {NAV_ITEMS.map(({ item, Icon }) => {
                const isActive = current === item;

                return (
                  <li
                    key={item}
                    onClick={() => navTo(item as NavValues)}
                    className={`flex items-center gap-2 rounded-2xl px-4 py-2 cursor-pointer transition-colors dark:text-slate-300 
          ${
            isActive
              ? "bg-blue-100 text-blue-900 dark:text-purple-400 dark:bg-slate-800"
              : "hover:bg-white dark:hover:bg-slate-800 text-gray-500"
          }`}
                  >
                    <Icon
                      color={
                        isActive ? (isDark ? "#c084fc" : "#1e3a8a") : "#9ca3af"
                      }
                      size={20}
                    />

                    <span
                      className={`${
                        isActive ? "dark:text-purple-400" : "text-gray-500"
                      } `}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="[@media(min-width:1049px)]:hidden">
            <MobileSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
