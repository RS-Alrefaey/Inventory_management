import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category?: string;
  active: boolean | true;
};

export type Status =
  | "cancelled"
  | "processing"
  | "delivered"
  | "shipped"
  | "pending";

export type Item = {
  productId: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  date: string;
  items: Item[];
  status: Status;
  note?: string;
};

export type Promo = {
  id: string;
  code: string;
  type: "fixed" | "percentage";
  value: number;
  startDate: string;
  endDate: string;
  active: boolean;
};

type DataContextType = {
  productList: Product[];
  orderList: Order[];
  promoList: Promo[];

  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  removeProduct: (id: string) => void;

  addOrder: (o: Order) => void;
  updateOrder: (o: Order) => void;
  removeOrder: (id: string) => void;

  addPromo: (p: Promo) => void;
  updatePromo: (p: Promo) => void;
  removePromo: (id: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const norm = (s: string) => s.toLowerCase().trim();

function generateId(prefix: string): string {
  const key = `${prefix}_counter`;
  const last = Number(localStorage.getItem(key) || "0");
  const next = last + 1;

  localStorage.setItem(key, String(next));

  return `${prefix}-${String(next).padStart(2, "0")}`;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [productList, setProduct] = useState<Product[]>(() => {
    const saved = localStorage.getItem("productList");
    return saved ? JSON.parse(saved) : [];
  });

  const [orderList, setOrder] = useState<Order[]>(() => {
    const saved = localStorage.getItem("orderList");
    return saved ? JSON.parse(saved) : [];
  });

  const [promoList, setPromo] = useState<Promo[]>(() => {
    const saved = localStorage.getItem("promoList");
    return saved ? JSON.parse(saved) : [];
  });

  // Product CRUD
  const addProduct: DataContextType["addProduct"] = (product /* no id */) => {
    const withId: Product = { ...product, id: generateId("PROD") };
    setProduct((prev) => [...prev, withId]);
  };

  const updateProduct: DataContextType["updateProduct"] = (product: Product) =>
    setProduct((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, ...product } : item
      )
    );

  const removeProduct: DataContextType["removeProduct"] = (id: string) => {
    if (!confirm("Are you sure you want to deactivate this product?")) return;
    setProduct((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: false } : p))
    );
  };
  //Order CRUD
  const addOrder: DataContextType["addOrder"] = (order: Order) => {
    const withId: Order = { ...order, id: generateId("ORD") };
    setOrder((prev) => [...prev, withId]);

    setProduct((prev) =>
      prev.map((p) => {
        const item = order.items.find((i) => i.productId === p.id);
        if (item) {
          const newStock = p.stock - item.qty;
          if (newStock < 0) {
            alert(`${p.name} stock is not enough!`);
            return p;
          }
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  const updateOrder: DataContextType["updateOrder"] = (order: Order) => {
    console.log("CTX updateOrder called with", order, order.status);
    setOrder((prev) =>
      prev.map((item) => (item.id === order.id ? { ...item, ...order } : item))
    );
  };
  const removeOrder: DataContextType["removeOrder"] = (orderId: string) =>
    setOrder((prev) => prev.filter((item) => item.id !== orderId));

  //Promo CRUD
  const addPromo: DataContextType["addPromo"] = (promo: Promo) => {
    const withId: Promo = { ...promo, id: generateId("PROM") };
    setPromo((prev) => [...prev, withId]);
  };
  const updatePromo: DataContextType["updatePromo"] = (promo: Promo) =>
    setPromo((prev) =>
      prev.map((item) => (item.id === promo.id ? promo : item))
    );
  const removePromo: DataContextType["removePromo"] = (promoId: string) =>
    setPromo((prev) => prev.filter((item) => item.id !== promoId));

  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productList));
  }, [productList]);

  useEffect(() => {
    localStorage.setItem("orderList", JSON.stringify(orderList));
  }, [orderList]);

  useEffect(() => {
    localStorage.setItem("promoList", JSON.stringify(promoList));
  }, [promoList]);

  const values = useMemo(
    () => ({
      productList,
      orderList,
      promoList,

      addProduct,
      updateProduct,
      removeProduct,

      addOrder,
      updateOrder,
      removeOrder,

      addPromo,
      updatePromo,
      removePromo,
    }),
    [
      productList,
      orderList,
      promoList,
      addProduct,
      updateProduct,
      removeProduct,
      addOrder,
      updateOrder,
      removeOrder,
      addPromo,
      updatePromo,
      removePromo,
    ]
  );

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside <DataProvider>");
  return ctx;
}

export const calculateTotal = (order: Order) => {
  return (order.items ?? [])
    .reduce((sum, item) => (sum += item.price * item.qty), 0)
    .toFixed(2);
};

export const calculateQty = (order: Order) => {
  return (order.items ?? []).reduce((qty, item) => qty + item.qty, 0);
};
