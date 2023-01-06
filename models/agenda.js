const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  jour: {
    type: String,
    required: true
  },
  plage: {
    type: String,
    required: true
  },
  etat: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Agenda', AgendaSchema);