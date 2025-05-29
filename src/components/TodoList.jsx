import TodoItem from "./TodoItem";
import { motion, AnimatePresence } from "framer-motion";

// Liste des tâches avec animation apparition/disparition
function TodoList({ taches, onToggle, onSupprimer, onEditer }) {
  return (
    <ul>
      {/* AnimatePresence gère l'animation des items quand ils sont ajoutés/supprimés */}
      <AnimatePresence>
        {taches.map((tache) => (
          <motion.div
            key={tache.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <TodoItem
              tache={tache}
              onToggle={onToggle}
              onSupprimer={onSupprimer}
              onEditer={onEditer}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TodoList;
