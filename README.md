# 🧾 FactureApp

![Angular](https://img.shields.io/badge/Angular-17.3.0-red.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green.svg)
![MongoDB](https://img.shields.io/badge/Mongoose-8.14.1-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

Une application web moderne pour la gestion et la génération de factures professionnelles.

## ✨ Fonctionnalités

- 📝 Création de factures
- 💰 Calcul automatique des totaux (HT, TVA, TTC)
- 📄 Export des factures en PDF
- 🎨 Interface utilisateur moderne et intuitive

## 📋 Prérequis

- Node.js et npm
- MongoDB
- Angular CLI (`npm install -g @angular/cli`)

## 🚀 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/ismail745/CC1.git
cd CC1
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
   - Créez un fichier `.env` dans le dossier `server`
   - Ajoutez les variables suivantes :
   ```env
   MONGODB_URI=votre_uri_mongodb
   PORT=3000
   ```

4. Démarrez le serveur backend :
```bash
node server/server.js
```

5. Dans un autre terminal, démarrez l'application Angular :
```bash
npm start
```

6. Accédez à l'application sur http://localhost:4200

## 📜 Scripts disponibles

```bash
npm start        # Démarre l'application Angular
npm run build    # Build l'application
npm test        # Lance les tests
npm run watch    # Mode développement avec auto-rebuild
```

## 🛠 Technologies utilisées

- Frontend :
  - Angular 17.3.0
  - Bootstrap 5.3.5
  - Font Awesome 6.7.2
  - jsPDF 3.0.1 et jspdf-autotable 5.0.2

- Backend :
  - Node.js
  - Express.js 5.1.0
  - MongoDB avec Mongoose 8.14.1
  - dotenv pour la configuration

## 📋 Structure du projet

```
FactureApp/
├── src/                    # Code source Angular
│   ├── app/               # Composants et services
│   ├── assets/            # Ressources statiques
│   └── styles.scss        # Styles globaux
├── server/                # Backend Node.js
│   ├── models/           # Modèles MongoDB
│   ├── routes/           # Routes API
│   └── server.js         # Point d'entrée du serveur
└── package.json          # Dépendances et scripts
```

## 👨‍💻 Auteur

**Ismail Kchibal**