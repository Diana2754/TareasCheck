import { Tarea } from '../types/Tarea';

const API_URL = import.meta.env.VITE_API_URL;

// GET
export const obtenerTareas = async (): Promise<Tarea[]> => {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error('Error al obtener tareas');
  return res.json();
};

// POST
export const crearTarea = async (
  tittle: string,
  description: string
): Promise<Tarea> => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tittle, description }),
  });

  if (!res.ok) throw new Error('Error al crear tarea');
  return res.json();
};

// PUT
export const actualizarTarea = async (
  id: number,
  data: Partial<Tarea>
): Promise<Tarea> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error al actualizar tarea');
  return res.json();
};

// DELETE
export const eliminarTarea = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Error al eliminar tarea');
};
