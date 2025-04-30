const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Récupérer toutes les commandes
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('client')
      .populate('lignes.produit');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer une commande
router.post('/', async (req, res) => {
  console.log('Reçu une nouvelle commande:', JSON.stringify(req.body, null, 2));
  
  // Vérifier que le client existe
  if (!req.body.client) {
    console.error('Client manquant dans la requête');
    return res.status(400).json({ message: 'Client manquant' });
  }

  // Vérifier que les lignes sont valides
  if (!req.body.lignes || !Array.isArray(req.body.lignes) || req.body.lignes.length === 0) {
    console.error('Lignes de commande invalides');
    return res.status(400).json({ message: 'Lignes de commande invalides' });
  }

  // Vérifier chaque ligne
  for (const ligne of req.body.lignes) {
    if (!ligne.produit) {
      console.error('Produit manquant dans une ligne');
      return res.status(400).json({ message: 'Produit manquant dans une ligne' });
    }
    if (!ligne.quantite || ligne.quantite <= 0) {
      console.error('Quantité invalide dans une ligne');
      return res.status(400).json({ message: 'Quantité invalide dans une ligne' });
    }
  }

  const order = new Order({
    client: req.body.client,
    lignes: req.body.lignes
  });

  try {
    console.log('Sauvegarde de la commande:', JSON.stringify(order, null, 2));
    const newOrder = await order.save();
    console.log('Commande sauvegardée:', JSON.stringify(newOrder, null, 2));
    
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('client')
      .populate('lignes.produit');
    console.log('Commande peuplée:', JSON.stringify(populatedOrder, null, 2));
    
    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error('Erreur lors de la sauvegarde:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 