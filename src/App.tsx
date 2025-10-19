import Header from "./components/Header";
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Orders from "./pages/Orders"
import Promos from "./pages/Promos"
import { useNav } from "./contexts/NavContext";

export default function App() {
  const { current } = useNav();

  return (
    <>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        {current === "Dashboard" && <Dashboard />}
        {current === "Products" && <Products />}
        {current === "Orders" && <Orders />}
        {current === "Promos" && <Promos />}
      </div>
    </>
  );
}
