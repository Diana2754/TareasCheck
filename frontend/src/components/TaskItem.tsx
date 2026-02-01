import { Tarea } from '../types/Tarea';

interface Funciones {
  tarea: Tarea;
  eliminar: (id: number) => void;
  completar: (id: number) => void;
  editar: (tarea: Tarea) => void;
}


export default function TaskItem({
  tarea,
  eliminar,
  completar,
  editar,
}: Funciones) {
  return (
    <li className="flex flex-col gap-2 bg-gray-50 border rounded-lg px-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className={tarea.completed ? "line-through text-gray-400" : ""}>
          {tarea.tittle}
        </h3>

        <span>{tarea.completed ? "✅" : ""}</span>
      </div>

      <p className="text-sm text-gray-600">{tarea.description}</p>

      <small className="text-xs text-gray-400">
        {new Date(tarea.createdAt).toLocaleString()}
      </small>

      <div className="flex gap-2 justify-end">
        <button
          onClick={() => completar(tarea.id)}
          className="text-black border border-gray-300 rounded-md px-4 py-2"
        >
          Completar
        </button>

        <button
          onClick={() => editar(tarea)}
          className="text-black border border-gray-300 rounded-md px-4 py-2"
        >
          Editar
        </button>

        <button
          onClick={() => eliminar(tarea.id)}
          className="text-black border border-gray-300 rounded-md px-4 py-2"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
