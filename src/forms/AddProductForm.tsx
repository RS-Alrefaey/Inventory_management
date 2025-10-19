import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useData, type Product } from "../contexts/DataContext";
import FormHeader from "../components/FormHeader";
import FormActions from "../components/FormActions";
import FormField from "../components/FormField";
import Switch from "@mui/material/Switch";
import { useDarkMode } from "../contexts/DarkModeContext";

export function AddProductForm({
  product,
  open,
  onClose,
}: {
  product?: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const { addProduct, updateProduct, removeProduct } = useData();
  const { isDark } = useDarkMode();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [active, setActive] = useState(true);

  function handleSubmit(e?: React.FormEvent<Element>) {
    if (e) e.preventDefault();

    if (Number(stock) < 0) {
      alert("Stock can't be less than 0");
      return;
    }

    if (product) {
      // EDIT mode
      updateProduct({
        id: product.id,
        name: name.trim(),
        sku: sku.trim(),
        price: Number(price),
        stock: Number(stock),
        category: category?.trim() || undefined,
        active: product.active,
      });
    } else {
      // ADD mode
      const newProduct: Product = {
        id: crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2),
        name: name.trim(),
        sku: sku.trim(),
        price: Number(price),
        stock: Number(stock),
        category: category?.trim() || undefined,
        active,
      };
      addProduct(newProduct);
    }

    resetForm();
    onClose();
  }

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category || "---");
      setSku(product.sku);
      setPrice(product.price);
      setStock(product.stock);
    } else {
      setName("");
      setSku("");
      setPrice(0);
      setStock(0);
    }
  }, [product]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setSku("");
    setPrice(0);
    setStock(0);
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
            <Dialog.Panel className="h-full w-[90%] max-w-md bg-slate-100 dark:bg-slate-900 shadow-xl">
              <FormHeader
                title={product ? "Edit Promo" : "Add Promo"}
                onClose={onClose}
                resetForm={resetForm}
              />

              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <FormField
                  label="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <FormField
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <FormField
                  label="SKU"
                  value={sku}
                  onChange={(e) => {
                    setSku(e.target.value);
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    label="Price"
                    labelPosition="top"
                    type="number"
                    value={price}
                    onChange={(e) =>
                      setPrice(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                  <FormField
                    label="Stock"
                    labelPosition="top"
                    type="number"
                    value={stock}
                    onChange={(e) =>
                      setStock(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />

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
                </div>
                <br />

                <FormActions
                  onSave={(e) => handleSubmit(e)}
                  onDelete={() => {
                    removeProduct(product!.id);
                    resetForm();
                    onClose();
                  }}
                  onCancel={() => {
                    resetForm();
                    onClose();
                  }}
                  showDelete={!!product}
                />
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
