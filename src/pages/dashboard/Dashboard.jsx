import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/taskStore";
import { useTasks } from "../../hooks/useTasks";
import TaskFilters from "../../components/tasks/TaskFilters";
import TaskList from "../../components/tasks/TaskList";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useUIStore } from "../../store/uiStore";
import TaskStats from "../../components/tasks/TaskStats";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { tasks, currentFilter, currentCategory, searchQuery, loading } =
    useTaskStore();

  // Hook que se suscribe a las tareas en tiempo real
  useTasks();
  const { theme } = useUIStore();
  const isDark = theme === "dark";

  // Aplicar filtros seleccionados
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "completed" && !task.completed) return false;
    if (currentFilter === "pending" && task.completed) return false;
    if (currentCategory !== "all" && task.category !== currentCategory)
      return false;
    const query = searchQuery.toLowerCase() || "";
    const resultados =
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query);
    return resultados;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen transition-colors ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1
            className={`text-4xl font-bold transition-colors ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Bienvenido, {user?.displayName || "Usuario"}
          </h1>

          <p
            className={`mt-2 text-lg ${
              isDark ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Tienes {tasks.filter((t) => !t.completed).length} tareas pendientes
          </p>
          <TaskStats />
        </div>

        <TaskFilters />

        <TaskList tasks={filteredTasks} />
      </div>
    </div>
  );
}
