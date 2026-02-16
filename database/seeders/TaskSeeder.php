<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpiar la tabla antes de insertar (opcional)
        Task::truncate();

        // Crear tareas de ejemplo para demostración
        $tasks = [
            [
                'title' => 'Completar el proyecto de Laravel',
                'description' => 'Implementar CRUD completo con base de datos',
                'is_completed' => true,
            ],
            [
                'title' => 'Estudiar componentes de React',
                'description' => 'Repasar useState, useEffect y props',
                'is_completed' => true,
            ],
            [
                'title' => 'Hacer ejercicios de Tailwind CSS',
                'description' => 'Practicar diseños responsive y componentes',
                'is_completed' => false,
            ],
            [
                'title' => 'Preparar presentación del proyecto',
                'description' => 'Crear slides con capturas de pantalla',
                'is_completed' => false,
            ],
            [
                'title' => 'Revisar código y documentación',
                'description' => 'Asegurar que todo esté bien comentado',
                'is_completed' => false,
            ],
            [
                'title' => 'Subir proyecto a GitHub',
                'description' => 'Push de la rama feature/Sesion6 y crear release v0.6',
                'is_completed' => false,
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }

        $this->command->info('✅ ' . count($tasks) . ' tareas creadas exitosamente!');
    }
}
