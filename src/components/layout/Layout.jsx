import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useUIStore } from "../../store/uiStore";

export default function Layout() {
  const { theme } = useUIStore();
  const isDark = theme === "dark";
  return (
    <div
      className={`min-h-screen  ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <Navbar />
      <main>
        {/* Outlet: aquí se renderizan las rutas hijas (Dashboard, TaskDetails, etc.)
         */}
        <Outlet />
      </main>
    </div>
  );
}
