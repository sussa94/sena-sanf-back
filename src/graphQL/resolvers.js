const resolverUser = require('../models/users/resolverUser');
const resolverAmbiente = require('../models/classRooms/resolverAmbiente');
const resolverProgram = require('../models/programs/resolverProgram');
const resolverCompetences = require('../models/competences/resolverCompetences');
const resolverResult = require('../models/results/resolverResult');
const resolverShedule = require('../models/shedules/resolverShedule');

module.exports = [
    resolverUser,
    resolverAmbiente,
    resolverProgram,
    resolverCompetences,
    resolverResult,
    resolverShedule
];