import { useTaskStore } from "../../store/taskStore";
import { useUIStore } from "../../store/uiStore";
import { FILTERS, CATEGORIES } from "../../utils/constants";

export default function TaskFilters() {
  const { searchQuery, setSearchQuery } = useTaskStore();
  const { currentFilter, currentCategory, setFilter, setCategory } =
    useTaskStore();

  const { theme } = useUIStore();
  const isDark = theme === "dark";

  return (
    <div
      className={`card mb-6 ${isDark ? "bg-gray-600 text-white" : " text-gray-900"}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Filtro por estado */}
        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${isDark ? "text-white" : " text-gray-900"}`}
          >
            Filtrar por estado
          </label>
          <div className="flex gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por categoría */}
        <div>
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${isDark ? "text-white" : " text-gray-900"}`}
          >
            Filtrar por categoría
          </label>
          <select
            value={currentCategory}
            onChange={(e) => setCategory(e.target.value)}
            className={`input-field ${isDark ? "bg-slate-600 text-white" : "bg-gray-50 text-gray-900"}`}
          >
            <option value="all">Todas las categorías</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Buscar */}

        <input
          type="text"
          className={`input-field ${isDark ? "bg-slate-600 text-white" : "bg-gray-50 text-gray-900"}`}
          placeholder="Ej: comprar pan dulce"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
