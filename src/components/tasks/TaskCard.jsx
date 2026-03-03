import { Link } from "react-router-dom";
import { updateTask, deleteTask } from "../../services/taskService";
import { CATEGORIES } from "../../utils/constants";
import { getDueDateLabel, isOverdue } from "../../utils/dateHelpers";
import toast from "react-hot-toast";
import { useUIStore } from "../../store/uiStore";

export default function TaskCard({ task }) {
  const { theme } = useUIStore();
  const isDark = theme === "dark";

  const category = CATEGORIES.find(
    (c) => String(c.id) === String(task.category),
  );

  const taskIsOverdue = isOverdue(task.dueDate) && !task.completed;

  const categoryColors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-gray-100 text-gray-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
  };

  const handleToggleComplete = async (e) => {
    e.preventDefault(); // Evitar que el Link navegue
    // TODO: Implementar toggle de completado
    try {
      await updateTask(task.id, { completed: !task.completed });
      toast.success("Tarea actualizada");
    } catch (error) {
      toast.success("Error al actualizar la tarea.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    // TODO: Implementar eliminación con confirmación
    const deleteConfirmed = window.confirm(
      `Se eliminará la tarea ${task.title}. ¿Deseas seguir?`,
    );

    if (deleteConfirmed) {
      try {
        await deleteTask(task.id);
        toast.success("Tarea eliminada");
      } catch (error) {
        toast.error("No se pudo eliminar la tarea");
      }
    }
  };

  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <div
        className={`card hover:shadow-lg transition-shadow p-5 rounded-lg ${task.completed ? "opacity-60 " : ""} ${taskIsOverdue ? "border-red-700" : "border-gray-300"} transition-colors duration-300 ${isDark ? "bg-gray-600 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <div className="flex justify-between items-center gap-4 mb-4">
          <h4
            className={`text-2xl font-semibold ${task.completed ? "text-gray-500 line-through" : "text-gray-800"} ${isDark ? "text-white" : " text-gray-900"}`}
          >
            {task.title}
          </h4>
          {category && (
            <span
              className={`px-4 py-1 font-bold bg-${category.color}-100 text-${category.color}-800 rounded-lg ${isDark ? "bg-${category.color}-700 text-${category.color}-800" : " text-gray-900"}`}
            >
              {category.label}
            </span>
          )}
        </div>

        {task.description && (
          <p
            className={`text-gray-900 mb-4 line-clamp-2 leading-relaxed ${isDark ? "text-white" : " text-gray-900"} `}
          >
            {task.description}
          </p>
        )}

        <div className="flex justify-between items-center text-sm mb-4 font-medium ">
          <span
            className={`${task.isOverdue ? "text-red-700 font-bold" : "text-gray-700 font-bold"} ${isDark ? "text-white" : " text-gray-900"}`}
          >
            {getDueDateLabel(task.dueDate)}
          </span>
          <span
            className={`${task.completed ? "font-bold" : "text-gray-700 font-bold"} ${isDark ? "text-white" : " text-gray-900"}`}
          >
            {task.completed ? "Completada" : "Pendiente"}
          </span>
        </div>
        <div className="flex gap-3 mt-4 pt-3 border-t border-gray-300">
          <button
            onClick={handleToggleComplete}
            className={`flex px-4 font-semibold hover:opacity-80 ${isDark ? "text-green-300" : " text-green-900 "}`}
          >
            {task.completed
              ? "Marcar como pendiente"
              : "Marcar como completada"}
          </button>
          <button
            onClick={handleDelete}
            className={`font-bold  hover:opacity-80 ${isDark ? "text-red-300" : "text-red-700 "}`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </Link>
  );
}
