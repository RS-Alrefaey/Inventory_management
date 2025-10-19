import type { Promo } from "../contexts/DataContext";

import { useState, useMemo, useEffect, useRef } from "react";
import { AddPromoForm } from "../forms/AddPromoForm";
import Switch from "@mui/material/Switch";
import { useData, norm } from "../contexts/DataContext";
import Toolbar from "../components/ToolBar";
import DataTable from "../components/DataTable";
import { useDarkMode } from "../contexts/DarkModeContext";

const columns = [
  "ID",
  "code",
  "type",
  "value",
  "start date",
  "end date",
  "active",
];

const Promos = () => {
  const [open, setOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<Promo | null>(null);
  const { promoList, removePromo, updatePromo } = useData();

  const { isDark } = useDarkMode();

  const [q, setQ] = useState("");
  const filteredPromos = useMemo(() => {
    const x = norm(q);
    if (!x) return promoList;
    return promoList.filter((pr) => norm(pr.code).includes(x));
  }, [q, promoList]);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const ids = promoList.map((p) => p.id);

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allSelected =
    promoList.length > 0 && selected.size === promoList.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    setSelected(() => (allSelected ? new Set() : new Set(ids)));
  };

  const headerRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (headerRef.current) headerRef.current.indeterminate = someSelected;
  }, [someSelected]);

  return (
    <div>
      <Toolbar
        title="Promos"
        searchValue={q}
        onSearchChange={setQ}
        onAdd={() => setOpen(true)}
        onDelete={() => {
          selected.forEach((id) => removePromo(id));
          setSelected(new Set());
        }}
        disableDelete={selected.size === 0}
      />

      <div className="rounded-2xl bg-white shadow-sm dark:bg-slate-800 overflow-hidden overflow-x-auto">
        <DataTable
          columns={columns}
          rows={filteredPromos}
          rowKey={(p) => p.id}
          selected={selected}
          toggleOne={toggleOne}
          toggleAll={toggleAll}
          allSelected={allSelected}
          onRowClick={(p) => {
            setSelectedPromo(p);
            setOpen(true);
          }}
          renderRow={(p) => (
            <>
              <td className="pl-4 pb-2">{p.id}</td>
              <td className="pl-4">{p.code}</td>
              <td className="pl-4">{p.type}</td>
              <td className="pl-4">{p.value}</td>
              <td className="pl-4">{p.startDate}</td>
              <td className="pl-4">{p.endDate}</td>
              <td className=" pl-4">
                <Switch
                  color={isDark ? "secondary" : "primary"}
                  checked={p.active}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => updatePromo({ ...p, active: !p.active })}
                />
              </td>
            </>
          )}
        />
      </div>
      <AddPromoForm
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedPromo(null);
        }}
        promo={selectedPromo}
      />
    </div>
  );
};

export default Promos;
