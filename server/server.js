const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB Memory Server
async function connectDB() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB Memory Server');
    
    // Ajout de données de test
    await addTestData();
  } catch (err) {
    console.error('Could not connect to MongoDB:', err);
  }
}

// Fonction pour ajouter des données de test
async function addTestData() {
  const Client = require('./models/Client');
  const Product = require('./models/Product');

  // Vérifier si des données existent déjà
  const clientsCount = await Client.countDocuments();
  const productsCount = await Product.countDocuments();

  if (clientsCount === 0) {
    await Client.create([
      { nom: 'Client 1', age: 30, email: 'client1@example.com' },
      { nom: 'Client 2', age: 25, email: 'client2@example.com' }
    ]);
  }

  if (productsCount === 0) {
    await Product.create([
      { libelle: 'Produit 1', prixUnitaireHT: 100 },
      { libelle: 'Produit 2', prixUnitaireHT: 200 },
      { libelle: 'Produit 3', prixUnitaireHT: 300 }
    ]);
  }
}

// Routes
app.use('/api/clients', require('./routes/clients'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Démarrer le serveur
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}); 