const CompetencesModel = require('./modelCompetences');
const boom = require('@hapi/boom');

const resolverCompetences = {
    Query : {
        allCompetences : async () => {
            const competences = await CompetencesModel.find();
            if (competences.length) return competences;
            throw boom.notFound('Competences Not Found in DB');
        }
    },
    Mutation : {
        addCompetences : async (parent, args) => {
            try {
                const compCreate = await CompetencesModel.create(args);
                return compCreate;
            } catch (error) {
                throw boom.notFound(`No se pudo crear la Competencia, Error: ${error}`);
            }
        }
    }
}

module.exports = resolverCompetences;