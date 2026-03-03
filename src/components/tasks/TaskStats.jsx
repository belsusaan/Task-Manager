import { useTaskStore } from "../../store/taskStore";
import { useUIStore } from "../../store/uiStore";
import { isOverdue } from "../../utils/dateHelpers";

export default function TaskStats() {
  const { tasks } = useTaskStore();
  const { theme } = useUIStore();
  const isDark = theme === "dark";

  const total = tasks.length;
  const completadas = tasks.filter((t) => t.completed).length;
  const pendientes = tasks.filter((t) => !t.completed).length;
  const vencidas = tasks.filter(
    (t) => isOverdue(t.dueDate) && !t.completed,
  ).length;

  const porcentaje = total > 0 ? ((completadas / total) * 100).toFixed(0) : 0;

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-5 gap-4 my-6 p-5 rounded-lg shadow-sm ${isDark ? "bg-gray-600 text-white" : " text-gray-900"}`}
    >
      <div>
        <p
          className={`font-bold  text-center ${isDark ? "text-blue-300 " : " text-blue-700 "}`}
        >
          TOTAL
        </p>
        <p className="text-xl text-center">{total}</p>
      </div>

      <div>
        <p
          className={`font-bold  text-center ${isDark ? "text-green-300 " : " text-green-700 "}`}
        >
          Completadas
        </p>
        <p className="text-xl text-center">{completadas}</p>
      </div>
      <div>
        <p
          className={`font-bold  text-center ${isDark ? "text-yellow-300 " : " text-yellow-700 "}`}
        >
          Pendientes
        </p>
        <p className="text-xl text-center">{pendientes}</p>
      </div>
      <div>
        <p
          className={`font-bold  text-center ${isDark ? "text-red-300 " : " text-red-700 "}`}
        >
          Vencidas
        </p>
        <p className="text-xl text-center">{vencidas}</p>
      </div>
      <div>
        <p
          className={`font-bold  text-center ${isDark ? "text-blue-300 " : " text-blue-700 "}`}
        >
          Completitud
        </p>
        <p className="text-xl text-center">{porcentaje}%</p>
      </div>
    </div>
  );
}
