import TaskItem from './TaskItem';
import { Tarea } from '../types/Tarea';

interface Funciones {
  tareas: Tarea[];
  eliminar: (id: number) => void;
  completar: (id: number) => void;
  editar: (tarea: Tarea) => void;
}

export default function TaskList({
  tareas,
  eliminar,
  completar,
  editar,
}: Funciones) {
  return (
    <ul className="flex flex-col gap-2">
      {tareas.map(t => (
        <TaskItem
          key={t.id}
          tarea={t}
          eliminar={eliminar}
          completar={completar}
          editar={editar}
        />
      ))}
    </ul>
  );
}
