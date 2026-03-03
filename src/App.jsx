import AppRouter from "./routes/AppRouter";

import { useUIStore } from "./store/uiStore";
function App() {
  const { theme } = useUIStore();

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <main className="max-w-7xl mx-auto p-4">
        <AppRouter />;
      </main>
    </div>
  );
}
export default App;
