const typeDefsUser = require('../models/users/typeDefsUser');
const typeDefsAmb = require('../models/classRooms/typeDefsAmb');
const typeDefsPrograms = require('../models/programs/typeDefsPrograms');
const typeDefsCompetences = require('../models/competences/typeDefsCompetences');
const typeDefsResult = require('../models/results/typeDefsResult');
const typeDefsShedule = require('../models/shedules/typeDefsShedule');
const typeDefsAuth = require('./auth/typeDefsAuth');

module.exports = [
    typeDefsUser,
    typeDefsAmb,
    typeDefsPrograms,
    typeDefsCompetences,
    typeDefsResult,
    typeDefsShedule,
    typeDefsAuth
];