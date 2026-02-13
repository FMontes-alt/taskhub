export default function Stats({ total, completed, percentage }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
            <div className="p-6 bg-white border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {/* Total Tareas */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-500 uppercase">
                            Total
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            {total}
                        </div>
                    </div>

                    {/* Completadas */}
                    <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm font-medium text-green-500 uppercase">
                            Completadas
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            {completed}
                        </div>
                    </div>

                    {/* Progreso */}
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium text-purple-500 uppercase">
                            Progreso
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            {percentage}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
