# 📦FactureApp-MEAN

## 📝 Description du Projet

Ce projet est une application web complète de gestion de commandes et de factures, développée avec la stack **MEAN** (MongoDB, Express.js, Angular, Node.js).  
L'application permet aux utilisateurs de gérer les **clients**, les **produits**, et de **créer des commandes** avec calcul automatique des totaux **HT** et **TTC**.

## 🛠️ Architecture Technique

### 🔙 Backend (Node.js + Express.js)
- 🗃️ **Base de données** : MongoDB avec Mongoose pour l'ORM  
- 🌐 **API RESTful** : Endpoints pour la gestion des clients, produits et commandes  
- ✅ **Validation** : Vérification des données côté serveur  
- ⚠️ **Gestion des erreurs** : Logging détaillé et messages d'erreur personnalisés  

### 🔜 Frontend (Angular 17)
- 🧩 **Architecture** : Composants standalone  
- 🖊️ **Interface** : Formulaire dynamique de création de commandes  
- ➗ **Calculs** : Totaux HT et TTC automatiques  
- 🔍 **Validation** : Vérification des données côté client  

## 🗃️ Modèles de Données

### 👤 Client
- 🏷️ Nom (obligatoire)  
- 🎂 Âge (obligatoire)  
- 📧 Email (obligatoire, unique)  

### 📦 Produit
- 🏷️ Libellé (obligatoire)  
- 💰 Prix unitaire HT (obligatoire)  

### 📑 Commande
- 📅 Date (automatique)  
- 👤 Client (référence)  
- 📄 Lignes de commande (tableau)  
  - 📦 Produit (référence)  
  - 🔢 Quantité (minimum 1)  

## 🚀 Fonctionnalités Principales

1. 👥 **Gestion des Clients**
   - Création et modification des profils clients  
   - Validation des emails uniques  
   - Stockage des informations essentielles  

2. 🛍️ **Catalogue de Produits**
   - Gestion des produits  
   - Prix unitaires HT  
   - Référencement simple  

3. 🧾 **Système de Commandes**
   - Création de commandes avec sélection client  
   - Ajout dynamique de lignes de commande  
   - Calcul automatique des totaux  
   - Validation des données avant envoi  

4. 🧮 **Calculs Automatiques**
   - Total HT par ligne  
   - Total HT global  
   - TVA (20% par défaut)  
   - Total TTC  

## ⚙️ Installation et Configuration

### 📋 Prérequis
- 🟢 Node.js (version 14+)  
- 🗄️ MongoDB (ou MongoDB Memory Server pour le développement)  
- 🅰️ Angular CLI  

### 📦 Installation
```bash
# Cloner le projet
git clone https://github.com/ismail745/CC1.git

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
```

### 🛠️ Configuration
- Le serveur utilise MongoDB Memory Server par défaut  
- Les variables d'environnement peuvent être configurées dans un fichier `.env`

## 🗂️ Structure du Projet

```
project/
├── server/                 # Backend
│   ├── models/            # Modèles Mongoose
│   │   ├── Client.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/            # Routes API
│   │   ├── clients.js
│   │   ├── products.js
│   │   └── orders.js
│   └── server.js          # Configuration du serveur
├── src/                   # Frontend Angular
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── services/
│   └── ...
└── package.json
```

## 🔐 Sécurité et Validation

- ✅ Validation des données côté client et serveur  
- 🛡️ Protection contre les injections  
- 🧾 Gestion des erreurs détaillée  
- 📝 Logging des opérations importantes  

## 🧪 Tests

Le projet inclut des **tests unitaires** avec **Jasmine** et **Karma**. Pour lancer les tests :

```bash
npm test
```

## 🤝 Contribution

Les contributions sont les bienvenues !  
Pour contribuer :

1. 🔀 Fork le projet  
2. 🌿 Créez une branche (`git checkout -b feature/AmazingFeature`)  
3. 💾 Committez vos changements (`git commit -m 'Add AmazingFeature'`)  
4. 📤 Push vers la branche (`git push origin feature/AmazingFeature`)  
5. 📬 Ouvrez une Pull Request  

## 👨‍💻 Auteur  
**Ismail Kchibal**
