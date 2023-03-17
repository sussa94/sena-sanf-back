const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CompetencesModel = require('../competences/modelCompetences');
const ResultModel = require('../results/modelResult');

const programSchema = new Schema({
    Nombre: { type: String, require: true, unique: true },
    Competencias: { type: Schema.Types.ObjectId, ref: CompetencesModel, require: true, unique: true },
    Resultados: { type: Schema.Types.ObjectId, ref: ResultModel, require: true, unique: true }
});

const ProgramModel = mongoose.model('program', programSchema)
module.exports = ProgramModel;