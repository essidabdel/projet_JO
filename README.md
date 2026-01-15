# 🏅 Projet JO - Prédictions Olympiques

Application web de prédictions sportives pour les Jeux Olympiques utilisant l'intelligence artificielle.

## 🚀 Technologies

**Frontend**
- React 18 + Vite
- React Router
- Plotly.js (visualisations)
- React Icons

**Backend**
- Node.js + Express
- PostgreSQL

## 📦 Installation

### Prérequis
- Node.js (v18+)
- PostgreSQL
- npm

### Configuration

1. **Cloner le projet**
```bash
git clone <url>
cd projet_jo
```

2. **Installer les dépendances**
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. **Configurer la base de données**

Créer une base PostgreSQL et configurer la connexion dans `.env`:
```
PORT=4000
DATABASE_URL=postgres://votre_user:votre_mtp@localhost:5432/olympics

```

4. **Importer les données**
```bash
cd server
npm run import
```

## 🎯 Lancement

### Development

**Terminal 1 - Backend:**
```bash
cd server
node index.js
```
Le serveur API démarre sur `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
L'application web démarre sur `http://localhost:5173`

## 📊 Fonctionnalités

- **🏠 Accueil** : Présentation du projet et de l'équipe
- **🔮 Prédictions** : Visualisation des prédictions globales et détaillées
- **📈 Analyses** : Graphiques et explications de la méthodologie IA
- **ℹ️ À propos** : Informations sur le projet

## 🗂️ Structure

```
projet_jo/
├── client/          # Application React
│   ├── src/
│   │   ├── pages/   # Pages de l'app
│   │   └── ui/      # Composants UI
│   └── public/      # Assets statiques
│
└── server/          # API Node.js
    ├── data/        # Données CSV
    ├── db.js        # Configuration DB
    ├── index.js     # Serveur Express
    └── import-data.js  # Script d'import
```

## 👥 Équipe

Projet développé par une équipe de 5.

---
