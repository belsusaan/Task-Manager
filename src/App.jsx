import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";
import { useUIStore } from "./store/uiStore";

function App() {
  const { theme } = useUIStore();
  const isDark = theme === "dark";

  return (
    <div className={`${isDark ? "bg-gray-900 text-white" : "text-gray-900"}`}>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRouter />;
    </div>
  );
}
export default App;
