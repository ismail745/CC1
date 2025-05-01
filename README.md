# 📦 FactureApp-MEAN  
> 💡 *La version bonus (PDF + Authentification) se trouve dans la branche `bonus`. Basculez sur cette branche pour y accéder.*

## 📝 Description du Projet

**FactureApp-MEAN** est une application web complète de gestion de commandes et de factures, développée avec la stack **MEAN** (MongoDB, Express.js, Angular, Node.js).  
Elle permet aux utilisateurs de gérer les **commandes**, avec un calcul automatique des totaux **HT** et **TTC**.

## 🛠️ Architecture Technique

### 🔙 Backend (Node.js + Express.js)
- 🗃️ **Base de données** : MongoDB avec Mongoose comme ORM  
- 🌐 **API RESTful** : Endpoints pour gérer les clients, produits et commandes  
- ✅ **Validation** : Contrôle des données côté serveur  
- ⚠️ **Gestion des erreurs** : Logs détaillés et messages d’erreur personnalisés  

### 🔜 Frontend (Angular)
- 🧩 **Architecture modulaire** : Composants autonomes  
- 🖊️ **Interface utilisateur** : Formulaires dynamiques de création de commandes  
- ➗ **Calculs automatiques** : Totaux HT et TTC en temps réel  
- 🔍 **Validation** : Vérification des champs côté client  

## 🗃️ Modélisation des Données

### 👤 Client
- 🏷️ Nom *(obligatoire)*  
- 🎂 Âge *(obligatoire)*  
- 📧 Email *(obligatoire et unique)*  

### 📦 Produit
- 🏷️ Libellé *(obligatoire)*  
- 💰 Prix unitaire HT *(obligatoire)*  

### 📑 Commande
- 📅 Date *(générée automatiquement)*  
- 👤 Client *(référence)*  
- 📄 Lignes de commande *(tableau)*  
  - 📦 Produit *(référence)*  
  - 🔢 Quantité *(minimum : 1)*  

## 🚀 Fonctionnalités Principales

1. 🧾 **Gestion des Commandes**
   - Sélection d’un client  
   - Ajout dynamique de lignes de commande  
   - Calcul automatique des totaux  
   - Validation complète avant envoi  

2. 🧮 **Calculs Automatisés**
   - Total HT par ligne  
   - Total HT global  
   - TVA à 20 % (modifiable si besoin)  
   - Total TTC  

## ⚙️ Installation et Configuration

### 📋 Prérequis
- 🟢 Node.js  
- 🗄️ MongoDB (ou MongoDB Memory Server pour le développement)  
- 🅰️ Angular CLI  

### 📦 Étapes d'installation
```bash
# Cloner le dépôt
git clone https://github.com/ismail745/CC1.git

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

### 🛠️ Configuration
- Utilisation par défaut de **MongoDB Memory Server**  
- Fichier `.env` pour définir les variables d’environnement  

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
│   └── server.js          # Point d’entrée du serveur
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
- ⚠️ Gestion détaillée des erreurs  
- 📝 Journalisation des opérations sensibles  

## 🧪 Tests

Le projet inclut des **tests unitaires** avec **Jasmine** et **Karma**.  
Pour exécuter les tests :

```bash
npm test
```

## 🤝 Contribution

Les contributions sont les bienvenues !  
Pour participer :

1. 🔀 *Forkez* le dépôt  
2. 🌿 Créez une branche (`git checkout -b feature/MaSuperFonctionnalité`)  
3. 💾 Commitez vos modifications (`git commit -m 'Ajout de MaSuperFonctionnalité'`)  
4. 📤 Poussez la branche (`git push origin feature/MaSuperFonctionnalité`)  
5. 📬 Créez une Pull Request  

## 👨‍💻 Auteur  
**Ismail Kchibal**
