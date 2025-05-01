const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  libelle: {
    type: String,
    required: true
  },
  prixUnitaireHT: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema); 