import { useData, type Order, norm } from "../contexts/DataContext";
import { useState, useMemo, useEffect, useRef } from "react";
import AddOrderForm from "../forms/AddOrderForm";
import { calculateQty, calculateTotal } from "../contexts/DataContext";
import Toolbar from "../components/ToolBar";
import DataTable from "../components/DataTable";

const columns = ["ID", "date", "quantity", "total", "status", "note"];

const Orders = () => {
  const { orderList, removeOrder } = useData();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [q, setQ] = useState("");
  const filteredOrders = useMemo(() => {
    const x = norm(q);
    if (!x) return orderList;
    return orderList.filter((o) => norm(o.id).includes(x));
  }, [q, orderList]);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const ids = orderList.map((p) => p.id);

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allSelected =
    orderList.length > 0 && selected.size === orderList.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    setSelected(() => (allSelected ? new Set() : new Set(ids)));
  };

  const headerRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (headerRef.current) headerRef.current.indeterminate = someSelected;
  }, [someSelected]);

  return (
    <>
      <Toolbar
        title="Orders"
        searchValue={q}
        onSearchChange={setQ}
        onAdd={() => setOpen(true)}
        onDelete={() => {
          selected.forEach((id) => removeOrder(id));
          setSelected(new Set());
        }}
        disableDelete={selected.size === 0}
      />

      <div className="rounded-2xl bg-white shadow-sm dark:bg-slate-800 overflow-hidden overflow-x-auto">
        <DataTable
          columns={columns}
          rows={filteredOrders}
          rowKey={(p) => p.id}
          selected={selected}
          toggleOne={toggleOne}
          toggleAll={toggleAll}
          allSelected={allSelected}
          onRowClick={(o) => {
            setSelectedOrder(o);
            setOpen(true);
          }}
          renderRow={(o) => (
            <>
              <td className="pl-4 pb-2">{o.id}</td>

              <td className="pl-4">{o.date}</td>
              <td className="pl-4">{calculateQty(o)}</td>
              <td className="pl-4">{calculateTotal(o)}</td>
              <td className="pl-4">{o.status}</td>
              <td className="pl-4">{o.note || "---"}</td>
            </>
          )}
        />
      </div>
      <AddOrderForm
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </>
  );
};

export default Orders;
