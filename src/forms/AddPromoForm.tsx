import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useData, type Promo } from "../contexts/DataContext";
import Switch from "@mui/material/Switch";
import FormField from "../components/FormField";
import { useDarkMode } from "../contexts/DarkModeContext";
import FormHeader from "../components/FormHeader";
import FormActions from "../components/FormActions";

export function AddPromoForm({
  promo,
  open,
  onClose,
}: {
  promo?: Promo | null;
  open: boolean;
  onClose: () => void;
}) {
  const { addPromo, updatePromo, removePromo } = useData();
  const { isDark } = useDarkMode();

  const [code, setCode] = useState("");
  const [type, setType] = useState<Promo["type"]>("fixed");
  const [value, setValue] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [active, setActive] = useState(true);

  function handleSubmit(e?: React.FormEvent<Element>) {
    if (e) e.preventDefault();

    if (new Date(endDate) <= new Date(startDate)) {
      alert("The end date should be after start date");
      return;
    }

    if (promo) {
      // EDIT mode
      updatePromo({
        id: promo.id,
        code,
        type,
        value,
        startDate,
        endDate,
        active,
      });
    } else {
      // ADD mode
      const newPromo: Promo = {
        id: crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2),
        code,
        type,
        value,
        startDate,
        endDate,
        active,
      };
      addPromo(newPromo);
    }

    resetForm();
    onClose();
  }

  useEffect(() => {
    if (promo) {
      setCode(promo.code);
      setType(promo.type);
      setValue(promo.value);
      setStartDate(promo.startDate);
      setEndDate(promo.endDate);
      setActive(promo.active);
    } else {
      setCode("");
      setType("fixed");
      setValue(0);
      setStartDate("");
      setEndDate("");
      setActive(true);
    }
  }, [promo]);

  const resetForm = () => {
    setCode("");
    setType("fixed");
    setValue(0);
    setStartDate("");
    setEndDate("");
    setActive(true);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          resetForm();
          onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transform transition duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition duration-150"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="h-full w-[90%] max-w-md bg-white dark:bg-slate-900 shadow-xl">
              <FormHeader
                title={promo ? "Edit Promo" : "Add Promo"}
                onClose={onClose}
                resetForm={resetForm}
              />

              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <FormField
                  label="Code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                <FormField
                  label="Type"
                  type="select"
                  value={type}
                  options={["fixed", "percentage"]}
                  onChange={(e) => setType(e.target.value as Promo["type"])}
                />

                <FormField
                  label="Value"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                />
                <div className="flex gap-4 w-full">
                  <FormField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    labelPosition="top"
                    className="w-full"
                  />

                  <FormField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    labelPosition="top"
                    className="w-full"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm mb-1 font-semibold dark:text-slate-300">
                    Activity :
                  </span>
                  <Switch
                    color={isDark ? "secondary" : "primary"}
                    checked={active}
                    onChange={() => setActive(!active)}
                  />
                </div>

                <FormActions
                  onSave={(e) => handleSubmit(e)}
                  onDelete={() => {
                    removePromo(promo!.id);
                    resetForm();
                    onClose();
                  }}
                  onCancel={() => {
                    resetForm();
                    onClose();
                  }}
                  showDelete={!!promo}
                />
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
