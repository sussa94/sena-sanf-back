const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelCompetences = new Schema({
    Competencias : [ { type: String, required: true } ]
});

const CompetencesModel = mongoose.model('competence', modelCompetences);
module.exports = CompetencesModel;