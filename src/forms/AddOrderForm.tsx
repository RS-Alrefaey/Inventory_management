import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import type { Order, Status, Item } from "../contexts/DataContext";
import { useData } from "../contexts/DataContext";
import FormHeader from "../components/FormHeader";
import FormField from "../components/FormField";
import FormActions from "../components/FormActions";

export default function AddOrderForm({
  open,
  onClose,
  order,
}: {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}) {
  const [date, setDate] = useState("");
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState<Status>("processing");
  const [note, setNote] = useState("");
  const { addOrder, updateOrder, removeOrder, productList } = useData();

  const [itemsDraft, setItemsDraft] = useState<Item[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const statusOptions: Status[] = [
    "cancelled",
    "processing",
    "delivered",
    "shipped",
    "pending",
  ] as const;

  const draftTotal = itemsDraft.reduce((s, it) => s + it.price * it.qty, 0);
  const draftQty = itemsDraft.reduce((n, it) => n + it.qty, 0);

  useEffect(() => {
    if (!open) return;
    if (order) {
      setDate(order.date);
      setStatus(order.status);
      setNote(order.note || "---");
      setItemsDraft(order.items ?? []);
    } else {
      setDate("");
      setNote("");
    }
  }, [order, open]);

  const resetForm = () => {
    setItemsDraft([]);
    setDate("");
    setQty(1);
    setNote("");
  };

  const handleAdd = () => {
    if (itemsDraft.length === 0) {
      alert("An order must contain at least one product.");
      return;
    }

    const product = productList.find((p) => p.id === selectedProduct);
    if (!product || qty <= 0) {
      console.log("no id");
      return;
    }
    setItemsDraft((prev) => {
      const i = prev.findIndex((l) => l.productId === product.id);
      if (i >= 0) {
        // merge qty if same product already exists
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { productId: product.id, qty, price: product.price }];
    });
    setSelectedProduct("");
    setQty(0);
  };

  const handleQtyChange = (id: string, next: number) => {
    setItemsDraft((prev) =>
      prev.map((l) =>
        l.productId === id ? { ...l, qty: Math.max(1, next) } : l
      )
    );
  };

  const handleRemove = (id: string) => {
    setItemsDraft((prev) => prev.filter((l) => l.productId !== id));
  };

  function handleSubmit(e?: React.FormEvent<Element>) {
    if (e) e.preventDefault();

    if (order) {
      updateOrder({ ...order, status, note, items: itemsDraft });
    } else {
      addOrder({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        status,
        note,
        items: itemsDraft,
      });
    }

    resetForm();
    onClose();
  }

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
                title={order ? "Edit Order" : "Add Order"}
                onClose={onClose}
                resetForm={resetForm}
              />

              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <div>
                  <label className="block text-sm mb-1 font-semibold dark:text-slate-300">
                    Order Date: {date}
                  </label>
                </div>

                <FormField
                  label="Status"
                  type="select"
                  value={status}
                  options={statusOptions}
                  onChange={(e) => {
                    setStatus(e.target.value as Status);
                  }}
                />
                <FormField
                  label="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                <div>
                  <label className="block text-md mb-1 font-semibold dark:text-purple-400 text-blue-900 ">
                    Products:
                  </label>

                  <ul className="space-y-1 pb-5">
                    {itemsDraft.map((i) => (
                      <li
                        key={i.productId}
                        className="flex items-center gap-3 "
                      >
                        <FormField
                          label={
                            productList.find((p) => p.id === i.productId)
                              ?.name || "REMOVED-P"
                          }
                          value={i.qty || 1}
                          onChange={(e) =>
                            handleQtyChange(
                              i.productId,
                              Number(e.target.value) || 1
                            )
                          }
                          className="w-3/4 "
                        />

                        <div className="flex items-center gap-2 dark:text-slate-300 w-1/4">
                          <span className="w-24 text-right">
                            {(i.price * i.qty).toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemove(i.productId)}
                            className="px-2"
                          >
                            ✕
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end  gap-3">
                    <FormField
                      label="Add product"
                      className="w-[50%]"
                      type="select"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      labelPosition="top"
                      options={[
                        { value: "", label: "Select a product" },
                        ...productList
                          .filter((p) => p.active)
                          .map((p) => ({
                            value: p.id,
                            label: `${p.name} — ${p.price.toFixed(2)}`,
                          })),
                      ]}
                    />
                    <FormField
                      label="Qty"
                      className="w-[50%]"
                      type="number"
                      labelPosition="top"
                      value={qty || 1}
                      onChange={(e) =>
                        setQty(Math.max(1, Number(e.target.value) || 1))
                      }
                    />
                    <div className="sm:col-span-2">
                      <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!selectedProduct}
                        className="w-full px-3 py-2 rounded bg-blue-900 text-white  dark:bg-purple-400"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 my-3 dark:text-slate-300">
                    <span>Items Count: {draftQty}</span>
                    <span>Total: {draftTotal.toFixed(2)}</span>
                  </div>
                </div>

                <FormActions
                  onSave={(e) => handleSubmit(e)}
                  onDelete={() => {
                    removeOrder(order!.id);
                    resetForm();
                    onClose();
                  }}
                  onCancel={() => {
                    resetForm();
                    onClose();
                  }}
                  showDelete={!!order}
                />
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
