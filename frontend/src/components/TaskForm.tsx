import { useEffect, useState } from 'react';
import { Tarea } from '../types/Tarea';

interface Props {
  onSubmit: (tittle: string, description: string) => void;
  tareaEditando: Tarea | null;
  cancelar: () => void;
}

export default function TaskForm({
  onSubmit,
  tareaEditando,
  cancelar,
}: Props) {
  const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (tareaEditando) {
      setTittle(tareaEditando.tittle);
      setDescription(tareaEditando.description);
    }
  }, [tareaEditando]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tittle.trim()) return;

    onSubmit(tittle, description);
    setTittle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Título"
        value={tittle}
        onChange={e => setTittle(e.target.value)}
      />

      <textarea
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white rounded-lg py-2"
        >
          {tareaEditando ? 'Actualizar' : 'Guardar'}
        </button>

      </div>
    </form>
  );
}

