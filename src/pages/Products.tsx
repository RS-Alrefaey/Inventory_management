import { type Product, useData } from "../contexts/DataContext";
import { useState, useMemo, useRef, useEffect } from "react";
import { AddProductForm } from "../forms/AddProductForm";
import { norm } from "../contexts/DataContext";
import Toolbar from "../components/ToolBar";
import DataTable from "../components/DataTable";
import { useDarkMode } from "../contexts/DarkModeContext";
import Switch from "@mui/material/Switch";

const columns = ["ID", "Name", "SKU", "Price", "Stock", "Active"];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { productList, removeProduct, updateProduct } = useData();
  const { isDark } = useDarkMode();

  const [q, setQ] = useState("");
  const filteredProducts = useMemo(() => {
    const x = norm(q);
    if (!x) return productList;
    return productList.filter(
      (p) => norm(p.sku).includes(x) || norm(p.name).includes(x)
    );
  }, [q, productList]);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const ids = productList.map((p) => p.id);

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allSelected =
    productList.length > 0 && selected.size === productList.length;
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
      <div>
        <Toolbar
          title="Products"
          searchValue={q}
          onSearchChange={setQ}
          onAdd={() => setOpen(true)}
          onDelete={() => {
            selected.forEach((id) => removeProduct(id));
            setSelected(new Set());
          }}
          disableDelete={selected.size === 0}
        />

        <div className="rounded-2xl bg-white shadow-sm dark:bg-slate-800 overflow-hidden overflow-x-auto">
          <DataTable
            columns={columns}
            rows={filteredProducts}
            rowKey={(p) => p.id}
            selected={selected}
            toggleOne={toggleOne}
            toggleAll={toggleAll}
            allSelected={allSelected}
            onRowClick={(p) => {
              setSelectedProduct(p);
              setOpen(true);
            }}
            renderRow={(p) => (
              <>
                <td className="pl-4 pb-2">{p.id}</td>
                <td className="pl-4 pb-2">
                  <div className="flex flex-col">
                    <span className="text-lg">{p.name}</span>
                    <span className="text-gray-600 dark:text-purple-200 font-light">
                      category: {p.category || "---"}
                    </span>
                  </div>
                </td>
                <td className="hidden md:table-cell pl-4">{p.sku}</td>
                <td className="pl-4">{p.price}</td>
                <td className="pl-4">{p.stock}</td>
                <Switch
                  color={isDark ? "secondary" : "primary"}
                  checked={p.active}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => updateProduct({ ...p, active: !p.active })}
                />
              </>
            )}
          />
        </div>
        <AddProductForm
          product={selectedProduct}
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedProduct(null);
          }}
        />
      </div>
    </>
  );
};

export default Products;
