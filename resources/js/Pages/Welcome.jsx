import { Head, useForm, router } from "@inertiajs/react";
import Stats from "@/Components/Stats";
import TaskItem from "@/Components/TaskItem";

export default function Welcome({ tasks }) {
    // --- FORM PARA AÑADIR NUEVA TAREA ---
    const { data, setData, post, reset, processing } = useForm({
        title: "",
        description: "",
    });

    // --- LÓGICA / FUNCIONES ---

    // 1. Añadir Tarea
    const addTask = (e) => {
        e.preventDefault();
        if (data.title.trim() === "") return;

        post(route("tasks.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    // 2. Marcar/Desmarcar como completada
    const toggleTask = (id) => {
        router.patch(
            route("tasks.toggle", id),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    // 3. Actualizar título (Editar)
    const updateTaskTitle = (id, newTitle) => {
        router.put(
            route("tasks.update", id),
            { title: newTitle },
            {
                preserveScroll: true,
            },
        );
    };

    // 4. Eliminar tarea
    const removeTask = (id) => {
        router.delete(route("tasks.destroy", id), {
            preserveScroll: true,
        });
    };

    // 5. Limpiar lista (Solo completadas)
    const clearCompleted = () => {
        router.delete(route("tasks.clearCompleted"), {
            preserveScroll: true,
        });
    };

    // --- CÁLCULO DE ESTADÍSTICAS ---
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.is_completed).length;
    const progress =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <>
            <Head title="Lista de Tareas" />
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="p-3 bg-white rounded-xl shadow-md mr-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-indigo-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                    TaskHub
                                </h1>
                                <p className="text-gray-500 font-medium">
                                    Gestiona tu día a día
                                </p>
                            </div>
                        </div>

                        {/* Botón Limpiar Completadas */}
                        {completedTasks > 0 && (
                            <button
                                onClick={clearCompleted}
                                className="px-4 py-2 bg-white text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg shadow-sm border border-red-100 font-medium transition duration-200 ease-in-out flex items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                                Limpiar completadas
                            </button>
                        )}
                    </div>

                    {/* Stats Component */}
                    <Stats
                        total={totalTasks}
                        completed={completedTasks}
                        percentage={progress}
                    />

                    {/* Main Content: Input + List */}
                    <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/50">
                        <div className="p-6 md:p-8">
                            {/* Formulario de Añadir */}
                            <form onSubmit={addTask} className="relative mb-8">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-24 py-4 text-lg border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-inner"
                                    placeholder="¿Qué tienes pendiente hoy?"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                <button
                                    type="submit"
                                    disabled={
                                        data.title.trim() === "" || processing
                                    }
                                    className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Añadir
                                </button>
                            </form>

                            {/* Lista de Tareas */}
                            <div className="space-y-4">
                                {tasks.length > 0 ? (
                                    <div className="relative">
                                        {/* Decoración de fondo para la lista */}
                                        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

                                        {tasks.map((task) => (
                                            <TaskItem
                                                key={task.id}
                                                task={task}
                                                onToggle={toggleTask}
                                                onUpdate={updateTaskTitle}
                                                onDelete={removeTask}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50 mb-6">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-indigo-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                                            ¡Todo al día!
                                        </h3>
                                        <p className="text-gray-500 max-w-sm mx-auto">
                                            No tienes tareas pendientes. Tómate
                                            un respiro o añade una nueva tarea
                                            para empezar.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer / Status bar */}
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                            <span>
                                {tasks.length}{" "}
                                {tasks.length === 1 ? "tarea" : "tareas"} en
                                total
                            </span>
                            <span>TaskHub v1.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
