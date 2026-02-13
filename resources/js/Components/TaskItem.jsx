import { useState, useRef, useEffect } from "react";

export default function TaskItem({ task, onToggle, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);
    const inputRef = useRef(null);

    // Enfocar el input cuando entramos en modo edición
    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            saveEdit();
        }
    };

    const saveEdit = () => {
        if (editValue.trim() !== "") {
            onUpdate(task.id, editValue);
        } else {
            setEditValue(task.title); // Revertir si está vacío
        }
        setIsEditing(false);
    };

    return (
        <div
            className={`group flex items-center justify-between p-4 mb-3 bg-white border rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${task.completed ? "bg-gray-50 border-gray-100 opacity-75" : "border-gray-200 hover:border-blue-200"}`}
        >
            <div className="flex items-center flex-1">
                {/* Checkbox personalizado */}
                <div className="relative flex items-center justify-center mr-4">
                    <input
                        type="checkbox"
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-gray-300 transition-all checked:border-green-500 checked:bg-green-500 hover:border-green-400"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                    />
                    <svg
                        className="pointer-events-none absolute h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                {/* Título (Texto o Input) */}
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 p-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span
                        className={`text-lg cursor-pointer select-none flex-1 transition-colors duration-200 ${
                            task.completed
                                ? "text-gray-400 line-through decoration-gray-300"
                                : "text-gray-700 font-medium group-hover:text-blue-900"
                        }`}
                        onClick={() => !task.completed && setIsEditing(true)}
                    >
                        {task.title}
                    </span>
                )}
            </div>

            {/* Delete Button (Visible on hover) */}
            <button
                onClick={() => onDelete(task.id)}
                className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                title="Eliminar tarea"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
            </button>
        </div>
    );
}
