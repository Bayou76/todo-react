import { useState } from 'react';

// Formulaire pour ajouter une tâche : texte, priorité, date
function TodoForm({ ajouterTache }) {
  const [texte, setTexte] = useState('');
  const [priorite, setPriorite] = useState('moyenne');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (texte.trim()) {
      ajouterTache({ texte, priorite, date });
      // Reset du formulaire après ajout
      setTexte('');
      setPriorite('moyenne');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow">
      {/* Input texte de la nouvelle tâche */}
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-3 dark:bg-gray-700 dark:border-gray-600"
      />

      {/* Ligne avec sélection priorité + date */}
      <div className="flex gap-3 mb-3">
        {/* Sélecteur de priorité */}
        <select
          value={priorite}
          onChange={(e) => setPriorite(e.target.value)}
          className="flex-1 rounded border px-2 py-2 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="haute">Haute priorité</option>
          <option value="moyenne">Priorité moyenne</option>
          <option value="basse">Basse priorité</option>
        </select>

        {/* Input date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 rounded border px-2 py-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* Bouton pour ajouter la tâche */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Ajouter
      </button>
    </form>
  );
}

export default TodoForm;
