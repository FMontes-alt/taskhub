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
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition duration-150 ease-in-out">
            <div className="flex items-center flex-1">
                {/* Checkbox */}
                <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-4 cursor-pointer"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />

                {/* Título (Texto o Input) */}
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 p-1 border-gray-300 rounded focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span
                        className={`text-lg cursor-pointer select-none flex-1 ${
                            task.completed
                                ? "text-gray-400 line-through"
                                : "text-gray-900"
                        }`}
                        onClick={() => !task.completed && setIsEditing(true)}
                    >
                        {task.title}
                    </span>
                )}
            </div>

            {/* Delete Button (Opcional, pero útil para depurar) */}
            {/* <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700 ml-4">
                &times;
            </button> */}
        </div>
    );
}
