const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const ambienteSchema = new Shema({
  Ambientes : [ { type: String, required: true, unique: true } ]
});

const AmbienteModel = mongoose.model('class-room', ambienteSchema);
module.exports = AmbienteModel;