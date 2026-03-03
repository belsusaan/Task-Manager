import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";

import { useUIStore } from "./store/uiStore";
function App() {
  const { theme } = useUIStore();

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRouter />;
    </div>
  );
}
export default App;
