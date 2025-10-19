import Title from "../components/Title";
import { useDarkMode } from "../contexts/DarkModeContext";
import KpiCard from "../components/KpiCard";
import { useData, type Order } from "../contexts/DataContext";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";

import {
  PromoKpiIcon,
  MonthleRevKpiIcon,
  AovIcon,
  TotalRevKpiIcon,
  TotalOrderKpiIcon,
  MonthlyOrderKpiIcon,
} from "../components/icons";

const Dashboard = () => {
  const { orderList, promoList } = useData();
  const { isDark } = useDarkMode();

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

  const revenueThisMonth = (orders: Order[]) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return orders
      .filter((o) => {
        const d = new Date(o.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce(
        (sum, o) =>
          sum +
          o.items.reduce(
            (subtotal, item) => subtotal + item.price * item.qty,
            0
          ),
        0
      )
      .toFixed(2);
  };

  const totalRevenueAllTime = (orders: Order[]) => {
    return orders
      .reduce(
        (sum, o) =>
          sum +
          o.items.reduce(
            (subtotal, item) => subtotal + item.price * item.qty,
            0
          ),
        0
      )
      .toFixed(2);
  };

  // active promos
  const activePromos = promoList.filter((p) => p.active).length;

  // total revenue this month
  const monthRevenue = Number(revenueThisMonth(orderList));

  // total revenue
  const totalRevenue = Number(totalRevenueAllTime(orderList));

  // order count
  const ordersCount = orderList.length;

  //order count this month
  const now = new Date();
  const monthOrdersCount = orderList.filter((o) => {
    const d = new Date(o.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  // avg order value
  const aov = ordersCount > 0 ? Number(totalRevenue) / ordersCount : 0;

  //line chart of revenues per month
  function orderTotal(order: Order) {
    return order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
  // revenue per month (sorted ascending by month)
  const revenueByMonth = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of orderList) {
      const key = o.date ? o.date.slice(0, 7) : ""; // YYYY-MM
      if (!key) continue;
      map.set(key, (map.get(key) || 0) + orderTotal(o));
    }
    // turn map to array + sort
    return [...map.entries()]
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([month, revenue]) => ({ month, revenue }));
  }, [orderList]);

  const ordersByStatus = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of orderList) {
      map.set(o.status, (map.get(o.status) || 0) + 1);
    }
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [orderList]);

  return (
    <div className="flex flex-col gap-4 pb-10 ">
      <div className="border-l-2 border-blue-900 dark:border-purple-400 rounded-r-xl my-5 gap-3 p-2 pb-10 bg-white dark:bg-slate-800">
        <Title text="Dashboard" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <KpiCard
            title="Active promos"
            value={activePromos}
            icon={
              <PromoKpiIcon color={isDark ? "#c084fc" : "#1e3a8a"} size={40} />
            }
          />
          <KpiCard
            title="Month revenue"
            value={monthRevenue}
            icon={
              <MonthleRevKpiIcon
                color={isDark ? "#c084fc" : "#1e3a8a"}
                size={40}
              />
            }
          />
          <KpiCard
            title="Total revenue"
            value={totalRevenue}
            icon={
              <TotalRevKpiIcon
                color={isDark ? "#c084fc" : "#1e3a8a"}
                size={40}
              />
            }
          />
          <KpiCard
            title="Total Order Counts"
            value={ordersCount}
            icon={
              <TotalOrderKpiIcon
                color={isDark ? "#c084fc" : "#1e3a8a"}
                size={40}
              />
            }
          />
          <KpiCard
            title="AOV"
            value={Number(aov.toFixed(2))}
            icon={<AovIcon color={isDark ? "#c084fc" : "#1e3a8a"} size={40} />}
          />

          <KpiCard
            title="Month Order Count"
            value={monthOrdersCount}
            icon={
              <MonthlyOrderKpiIcon
                color={isDark ? "#c084fc" : "#1e3a8a"}
                size={40}
              />
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-sm p-4 pb-10 h-72">
          <h3 className="text-sm font-medium mb-3 dark:text-slate-300">
            Revenue by month
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
              <Line type="monotone" dataKey="revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-sm p-4 pb-10 h-72">
          <h3 className="text-sm font-medium mb-3 dark:text-slate-300">
            Orders by status
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value">
                {ordersByStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
