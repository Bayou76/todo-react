import { useState } from "react";

// Composant pour une tâche unique : affichage, édition, suppression, toggle
function TodoItem({ tache, onToggle, onSupprimer, onEditer }) {
  const [enEdition, setEnEdition] = useState(false);
  const [nouveauTexte, setNouveauTexte] = useState(tache.texte);

  // Définir la couleur selon la priorité
  const couleurPriorite = {
    haute: "text-red-600",
    moyenne: "text-yellow-500",
    basse: "text-green-600",
  }[tache.priorite] || "text-gray-400";

  // Vérifie si la date est proche (moins de 2 jours)
  const estUrgente =
    tache.date &&
    new Date(tache.date) <= new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

  // Valider modification texte tâche
  const handleEdit = () => {
    if (nouveauTexte.trim()) {
      onEditer(tache.id, nouveauTexte);
      setEnEdition(false);
    }
  };

  return (
    // Liste item avec styles conditionnels selon état
    <li
      className={`flex items-center gap-4 p-3 rounded shadow mb-3 transition
        ${tache.terminee ? "line-through text-gray-400" : "text-gray-900 dark:text-gray-100"}
        ${estUrgente ? "bg-red-100 border-l-4 border-red-500" : "bg-white dark:bg-gray-800"}`}
    >
      {/* Checkbox toggle terminé / non terminé */}
      <input
        type="checkbox"
        checked={tache.terminee}
        onChange={() => onToggle(tache.id)}
        className="w-5 h-5 cursor-pointer"
      />

      <div className="flex-1">
        {enEdition ? (
          <>
            {/* Input pour éditer texte */}
            <input
              type="text"
              value={nouveauTexte}
              onChange={(e) => setNouveauTexte(e.target.value)}
              className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoFocus
            />
            <div className="mt-2 flex gap-2">
              {/* Bouton valider édition */}
              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                ✅
              </button>

              {/* Bouton annuler édition */}
              <button
                onClick={() => setEnEdition(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                ❌
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Affichage texte tâche */}
            <p className="select-none cursor-default">{tache.texte}</p>

            {/* Infos date + priorité en dessous */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex gap-3">
              <span>📅 {tache.date || "Aucune date"}</span>
              <span className={couleurPriorite}>⚠️ {tache.priorite}</span>
            </div>
          </>
        )}
      </div>

      {/* Boutons modifier / supprimer (quand pas en édition) */}
      {!enEdition && (
        <div className="flex flex-col gap-2">
          {/* Bouton modifier */}
          <button
            onClick={() => setEnEdition(true)}
            className="px-2 py-1 bg-blue-400 rounded hover:bg-blue-700 transition"
            aria-label="Modifier la tâche"
          >
            ✏️
          </button>

          {/* Bouton supprimer */}
          <button
            onClick={() => onSupprimer(tache.id)}
            className="px-2 py-1 bg-orange-400 text-white rounded hover:bg-orange-700 transition"
            aria-label="Supprimer la tâche"
          >
            🗑
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
