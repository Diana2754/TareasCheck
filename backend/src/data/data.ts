export interface Tarea {
  id: number;
  tittle: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export let tareas: Tarea[] = [];
