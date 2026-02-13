import { Head } from "@inertiajs/react";
import { useState } from "react";
import Stats from "@/Components/Stats";
import TaskItem from "@/Components/TaskItem";

export default function Welcome() {
    // --- ESTADO ---
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    // --- LÓGICA / FUNCIONES ---

    // 1. Añadir Tarea
    const addTask = () => {
        if (newTaskTitle.trim() === "") return;

        const newTask = {
            id: Date.now(), // Usamos la fecha como ID único temporal
            title: newTaskTitle,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setNewTaskTitle(""); // Limpiar input
    };

    // 2. Marcar/Desmarcar como completada
    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task,
            ),
        );
    };

    // 3. Actualizar título (Editar)
    const updateTaskTitle = (id, newTitle) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task,
            ),
        );
    };

    // 4. Eliminar tarea (Opcional, pero necesario para limpiar completadas)
    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // 5. Limpiar lista (Solo completadas)
    const clearCompleted = () => {
        setTasks(tasks.filter((task) => !task.completed));
    };

    // --- CÁLCULO DE ESTADÍSTICAS ---
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const progress =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <>
            <Head title="Lista de Tareas" />
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center justify-center mb-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-blue-600 mr-3"
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
                        <h1 className="text-3xl font-bold text-gray-900">
                            Lista de tareas pendientes
                        </h1>
                    </div>

                    {/* Stats Component */}
                    <Stats
                        total={totalTasks}
                        completed={completedTasks}
                        percentage={progress}
                    />

                    {/* Input y Botón de Añadir */}
                    <div className="flex space-x-4 mb-6">
                        <input
                            type="text"
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="Añadir nueva tarea..."
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTask()}
                        />
                        <button
                            onClick={addTask}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium transition duration-150 ease-in-out"
                            disabled={newTaskTitle.trim() === ""}
                        >
                            Añadir
                        </button>
                    </div>

                    {/* Lista de Tareas */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        {tasks.length > 0 ? (
                            <div>
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
                            <p className="text-center text-gray-500 py-6">
                                No hay tareas pendientes. ¡Añade una!
                            </p>
                        )}
                    </div>

                    {/* Botón Limpiar Completadas */}
                    {completedTasks > 0 && (
                        <div className="flex justify-end">
                            <button
                                onClick={clearCompleted}
                                className="text-red-600 hover:text-red-800 font-medium transition duration-150 ease-in-out"
                            >
                                Limpiar lista (Completadas)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
