const mongoose = require('mongoose');

const ligneCmdSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantite: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  lignes: [ligneCmdSchema]
});

module.exports = mongoose.model('Order', orderSchema); 