import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu as MenuIcon, X } from "lucide-react";
import { NAV_VALUES, useNav } from "../contexts/NavContext";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { current, navTo } = useNav();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl  px-5 py-2 hover:bg-blue-100 dark:hover:bg-slate-800"
        aria-label="Open menu"
      >
        <MenuIcon className="text-slate-800 dark:text-purple-400 " size={30} />
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex justify-end ">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-200"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in duration-150"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative w-72 max-w-[85%] h-full bg-white dark:bg-slate-900 shadow-xl ring-1 ring-slate-200 dark:ring-slate-800">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                  <Dialog.Title className="text-base font-semibold text-slate-800 dark:text-slate-100">
                    Menu
                  </Dialog.Title>
                  <button
                    type="button"
                    className="p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={18} className="dark:text-emerald-100 " />
                  </button>
                </div>

                <nav className="p-2">
                  <ul className="space-y-1">
                    {NAV_VALUES.map((label) => (
                      <li key={label}>
                        <button
                          type="button"
                          className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl text-xl text-slate-700 dark:text-purple-400
                            ${
                              label === current
                                ? `bg-blue-100 dark:bg-slate-800/40`
                                : `hover:bg-blue-100/50 hover:dark:bg-slate-800/40`
                            }
                              `}
                          onClick={() => {
                            setOpen(false);
                            navTo(label);
                          }}
                        >
                          <span className="font-medium">{label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
