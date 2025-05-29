import { useState, useEffect, useRef } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// Composant principal de l'application To-do list
function App() {
  // Chargement initial des tâches depuis localStorage (ou tableau vide)
  const [taches, setTaches] = useState(() => {
    const sauvegarde = localStorage.getItem("taches");
    return sauvegarde ? JSON.parse(sauvegarde) : [];
  });

  // State pour gérer les notifications toast
  const [toasts, setToasts] = useState([]);

  // Mise à jour locale storage dès qu'une tâche est modifiée
  useEffect(() => {
    localStorage.setItem("taches", JSON.stringify(taches));
  }, [taches]);

  // Fonction pour afficher un toast temporaire
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  // Ajouter une nouvelle tâche à la liste
  const ajouterTache = ({ texte, priorite, date }) => {
    const nouvelleTache = {
      id: Date.now(),
      texte,
      priorite,
      date,
      terminee: false,
    };
    setTaches([nouvelleTache, ...taches]);
    showToast("✅ Tâche ajoutée !");
  };

  // Ref pour gérer debounce sur toast toggle tâche
  const toastTimeout = useRef(null);

  // Toggle état terminé/non terminé d'une tâche
  const toggleTache = (id) => {
    setTaches((prevTaches) => {
      const nouvellesTaches = prevTaches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      );

      const tacheModifiee = nouvellesTaches.find((t) => t.id === id);

      // Supprime toast précédent si existe
      if (toastTimeout.current) {
        clearTimeout(toastTimeout.current);
      }

      // Affiche toast après un petit délai
      toastTimeout.current = setTimeout(() => {
        if (tacheModifiee.terminee) {
          showToast("✔️ Tâche terminée !");
        } else {
          showToast("↩️ Tâche à faire !");
        }
      }, 200);

      return nouvellesTaches;
    });
  };

  // Supprimer une tâche
  const supprimerTache = (id) => {
    setTaches(taches.filter((tache) => tache.id !== id));
    showToast("🗑️ Tâche supprimée !");
  };

  // Modifier le texte d'une tâche
  const editerTache = (id, nouveauTexte) => {
    setTaches(
      taches.map((tache) =>
        tache.id === id ? { ...tache, texte: nouveauTexte } : tache
      )
    );
    showToast("✏️ Tâche modifiée !");
  };

  // États pour filtres priorité, statut et mode sombre
  const [filtrePriorite, setFiltrePriorite] = useState("toutes");
  const [filtreStatut, setFiltreStatut] = useState("toutes");
  const [darkMode, setDarkMode] = useState(false);

  // Ajout/suppression de la classe dark sur root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Ordre des priorités pour tri
  const ordrePriorite = { haute: 1, moyenne: 2, basse: 3 };

  // Filtrage et tri des tâches pour affichage
  const tachesFiltrees = taches
    .filter((tache) =>
      filtrePriorite === "toutes" ? true : tache.priorite === filtrePriorite
    )
    .filter((tache) => {
      if (filtreStatut === "toutes") return true;
      if (filtreStatut === "a_faire") return !tache.terminee;
      if (filtreStatut === "terminees") return tache.terminee;
    })
    .sort((a, b) => {
      // Tri par priorité
      const diffPriorite =
        (ordrePriorite[a.priorite] || 99) - (ordrePriorite[b.priorite] || 99);
      if (diffPriorite !== 0) return diffPriorite;

      // Puis tri par date (plus proche en premier)
      const dateA = a.date ? new Date(a.date) : new Date(8640000000000000);
      const dateB = b.date ? new Date(b.date) : new Date(8640000000000000);
      return dateA - dateB;
    });

  return (
    <div
      className={`min-h-screen px-1 py-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-xl mx-auto relative">
        {/* En-tête avec titre + bouton mode sombre */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold">Ma To-do List 📝</h1>

          <button
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Mode clair" : "🌙 Mode sombre"}
          </button>
        </header>

        {/* Formulaire pour ajouter une nouvelle tâche */}
        <TodoForm ajouterTache={ajouterTache} />

        {/* Filtres : priorité et statut */}
        <div className="mb-4 flex gap-6 justify-center">
          <div>
            <label>Filtrer par priorité : </label>
            <select
              value={filtrePriorite}
              onChange={(e) => setFiltrePriorite(e.target.value)}
              className="ml-2 rounded border border-gray-400 dark:bg-gray-700 dark:text-white px-2 py-1"
            >
              <option value="toutes">Toutes</option>
              <option value="haute">Haute</option>
              <option value="moyenne">Moyenne</option>
              <option value="basse">Basse</option>
            </select>
          </div>

          <div>
            <label>Filtrer par statut : </label>
            <select
              value={filtreStatut}
              onChange={(e) => setFiltreStatut(e.target.value)}
              className="ml-2 rounded border border-gray-400 dark:bg-gray-700 dark:text-white px-2 py-1"
            >
              <option value="toutes">Toutes</option>
              <option value="a_faire">À faire</option>
              <option value="terminees">Terminées</option>
            </select>
          </div>
        </div>

        {/* Liste des tâches */}
        <TodoList
          taches={tachesFiltrees}
          onToggle={toggleTache}
          onSupprimer={supprimerTache}
          onEditer={editerTache}
        />

        {/* Zone notifications toasts */}
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col gap-3 z-50">
          {toasts.map(({ id, message }) => (
            <div
              key={id}
              className="bg-gray-800 text-white px-6 py-2 rounded shadow-lg opacity-90"
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
