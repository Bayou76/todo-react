# 📝 To-do List React

Une application To-do List simple et fonctionnelle réalisée avec React.  
Elle permet de gérer des tâches avec priorités, dates, filtres, mode sombre et animations.

---

## 🚀 Fonctionnalités

- Ajouter, modifier et supprimer des tâches  
- Priorités : haute, moyenne, basse  
- Attribution d’une date d’échéance  
- Mise en avant des tâches urgentes (date proche)  
- Filtres par priorité et statut (à faire / terminées)  
- Tri automatique par priorité puis date (les plus urgentes en premier)  
- Mode sombre / clair activable  
- Notifications toast pour feedback utilisateur  
- Sauvegarde automatique dans `localStorage`

---

## 📦 Installation et lancement

```bash
git clone <URL_DU_DEPOT>
cd projet-todo-react
npm install
npm start
Ouvrir ensuite http://localhost:3000 dans votre navigateur 
```

---

## 🗂 Structure du projet

```bash
src/
├── components/
│   ├── TodoForm.jsx      # Formulaire pour ajouter une tâche
│   ├── TodoItem.jsx      # Composant affichant une tâche, avec édition et suppression
│   └── TodoList.jsx      # Liste animée des tâches
├── App.jsx               # Composant principal qui gère l’état et la logique globale
└── styles.css            # Styles globaux avec Tailwind CSS
```

---

## 🛠 Technologies utilisées

React (hooks fonctionnels)
Tailwind CSS pour le design
Framer Motion pour les animations
localStorage pour la persistance des données

---

### 🤝 Contribution

Les contributions sont les bienvenues !
Pour contribuer, merci de :

Forker le projet
Créer une branche feature (git checkout -b feature/ma-fonctionnalite)
Committer vos changements (git commit -m "Ajout d'une fonctionnalité")
Pousser votre branche (git push origin feature/ma-fonctionnalite)
Ouvrir une Pull Request

---

#### 📄 Licence

Ce projet est sous licence MIT.
Voir le fichier LICENSE pour plus de détails.