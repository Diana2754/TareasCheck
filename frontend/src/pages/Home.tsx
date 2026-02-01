import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Tarea } from '../types/Tarea';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null);

  // GET
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTareas(data))
      .catch(console.error);
  }, []);

  // CREATE / UPDATE
  const guardarTarea = (tittle: string, description: string) => {
    if (tareaEditando) {
      // UPDATE
      fetch(`${API_URL}/tasks/${tareaEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tittle, description }),
      })
        .then(res => res.json())
        .then((actualizada: Tarea) => {
          setTareas(prev =>
            prev.map(t => (t.id === actualizada.id ? actualizada : t))
          );
          setTareaEditando(null);
        });
    } else {
      // CREATE
      fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tittle, description }),
      })
        .then(res => res.json())
        .then((nueva: Tarea) =>
          setTareas(prev => [...prev, nueva])
        );
    }
  };

  // ELIMINAR
  const eliminarTarea = (id: number) => {
    fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        setTareas(prev => prev.filter(t => t.id !== id));
      });
  };

  // COMLETAR 
  const completarTarea = (id: number) => {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;

    fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !tarea.completed }),
    })
      .then(res => res.json())
      .then((actualizada: Tarea) => {
        setTareas(prev =>
          prev.map(t => (t.id === id ? actualizada : t))
        );
      });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl  p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Gestión de tareas
        </h1>

        <TaskForm
          onSubmit={guardarTarea}
          tareaEditando={tareaEditando}
          cancelar={() => setTareaEditando(null)}
        />

        <TaskList
          tareas={tareas}
          eliminar={eliminarTarea}
          completar={completarTarea}
          editar={setTareaEditando}
        />
      </div>
    </div>
  );
}

