import { useUIStore } from "../../store/uiStore";

export default function LoadingSpinner() {
  const { theme } = useUIStore();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center  ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="text-center">
        {/* Spinner animado con Tailwind */}
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Cargando...</p>
      </div>
    </div>
  );
}
