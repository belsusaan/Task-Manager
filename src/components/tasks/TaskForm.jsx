import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { createTask, updateTask } from "../../services/taskService";
import { CATEGORIES, PRIORITIES } from "../../utils/constants";
import { useUIStore } from "../../store/uiStore";
import toast from "react-hot-toast";

export default function TaskForm({ onClose, taskToEdit = null }) {
  const user = useAuthStore((state) => state.user);
  const { theme } = useUIStore();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!taskToEdit;

  const defaultValues = taskToEdit
    ? {
        title: taskToEdit.title,
        description: taskToEdit.description || "",
        category: taskToEdit.category,
        priority: taskToEdit.priority,
        // Convertir Date a formato YYYY-MM-DD para el input
        dueDate: taskToEdit.dueDate
          ? taskToEdit.dueDate.toISOString().split("T")[0]
          : "",
      }
    : {
        title: "",
        description: "",
        category: "other",
        priority: "medium",
        dueDate: "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    const taskData = {
      ...data,
      // Convertir string de fecha a objeto Date (o null si está vacío)
      userId: user.uid,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    };

    try {
      let result;
      if (isEditing) {
        result = await updateTask(taskToEdit.id, taskData);
      } else {
        result = await createTask(user.uid, taskData);
      }

      if (result.success) {
        toast.success(isEditing ? "Tarea actualizada" : "Tarea creada");
        onClose(); // Cerrar formulario al crear exitosamente
      } else {
        setError("Error al crear la tarea");
        toast.error(
          isEditing
            ? "Error al actualizar la tarea"
            : "Error al crear la tarea",
        );
      }
    } catch (err) {
      toast.error(
        isEditing ? "Error al actualizar la tarea" : "Error al crear la tarea",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`card ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Header del formulario */}
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-xl font-bold text-gray-800 ${isDark ? " text-white" : "text-gray-900"}`}
        >
          {taskToEdit ? "Editar Tarea" : "Nueva Tarea"}
        </h3>
        <button
          onClick={onClose}
          className={` hover:text-gray-700 ${isDark ? " text-white" : "text-gray-500"}`}
        >
          Cerrar
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo: Título */}
        <div>
          <label
            className={`block text-sm font-medium  mb-2 ${isDark ? " text-white" : "text-gray-700"}`}
          >
            Título *
          </label>
          <input
            type="text"
            className={`input-field ${isDark ? "bg-slate-600 text-white" : "bg-gray-50 text-gray-900"}`}
            placeholder="Ej: Completar informe mensual"
            {...register("title", {
              required: "El título es obligatorio",
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Campo: Descripción */}
        <div>
          <label
            className={`block text-sm font-medium  mb-2 ${isDark ? " text-white" : "text-gray-700"}`}
          >
            Descripción
          </label>
          <textarea
            className={`input-field ${isDark ? "bg-slate-600 !text-white" : "bg-gray-50 text-gray-900"}`}
            rows="3"
            placeholder="Descripción detallada de la tarea..."
            {...register("description")}
          />
        </div>

        {/* Grid de 3 columnas: Categoría, Prioridad, Fecha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              className={`block text-sm font-medium  mb-2 ${isDark ? " text-white" : "text-gray-700"}`}
            >
              Categoría *
            </label>
            <select
              className={`input-field ${isDark ? "bg-slate-600 !text-white" : "bg-gray-50 text-gray-900"}`}
              {...register("category", { required: true })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium  mb-2 ${isDark ? " text-white" : "text-gray-700"}`}
            >
              Prioridad *
            </label>
            <select
              className={`input-field ${isDark ? "bg-slate-600 !text-white" : "bg-gray-50 text-gray-900"}`}
              {...register("priority", { required: true })}
            >
              {PRIORITIES.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium  mb-2 ${isDark ? " text-white" : "text-gray-700"}`}
            >
              Fecha de vencimiento
            </label>
            <input
              type="date"
              className={`input-field ${isDark ? "bg-slate-600 !text-white" : "bg-gray-50 text-gray-900"}`}
              {...register("dueDate")}
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading
              ? "Guardando..."
              : taskToEdit
                ? "Actualizar"
                : "Crear Tarea"}
          </button>
        </div>
      </form>
    </div>
  );
}
