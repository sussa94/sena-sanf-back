const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('../users/modelUser');

const sheduleSchema = new Schema({
  Instructor: { type: Schema.Types.ObjectId, ref: UserModel, required: true, unique: true },
  Horario: [
    {
      FechaInicio: { type: String, required: true },
      FechaFin: { type: String, required: true },
      Ficha: [
        {
          Num_Ficha: { type: String, required: true },
          Num_Ruta: { type: String, required: true },
          Trimestre: { type: String, required: true },
          Codigo: { type: String },
          Color: { type: Number, required: true },
          Programa: { type: String, required: true },
          Num_Aprendices: { type: String },
          Ambiente: { type: String, required: true },
          Competencias: [ { type: String, required: true } ],
          Resultados: [ { type: String, required: true } ],
          Descripcion: { type: String },
        }
      ],
      Complementaria: [ { type: String } ],
      Planta: { type: Boolean, required: true },
      Horas: [
        {
          pos: { type: Number, required: true },
          color: { type: String, required: true },
          Ambiente: { type: String }
        }
      ]
    }
  ]
});

const SheduleModel = mongoose.model('shedule', sheduleSchema);
module.exports = SheduleModel;