import { Request, Response } from 'express';
import { tareas, Tarea } from '../data/data';

// GET 
export const getTareas = (_req: Request, res: Response) => {
  res.json(tareas);
};

// POST 
export const crearTarea = (req: Request, res: Response) => {
  const { tittle, description } = req.body;

  if (!tittle || !description) {
    return res.status(400).json({
      message: 'tittle y description son obligatorios',
    });
  }

  const nuevaTarea: Tarea = {
    id: Date.now(),
    tittle,
    description,
    completed: false,
    createdAt: new Date(),
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
};

// PUT 
export const actualizarTarea = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { tittle, description, completed } = req.body;

  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  if (tittle !== undefined) tarea.tittle = tittle;
  if (description !== undefined) tarea.description = description;
  if (completed !== undefined) tarea.completed = completed;

  res.json(tarea);
};

// DELETE 
export const eliminarTarea = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = tareas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  tareas.splice(index, 1);
  res.status(204).send();
};
