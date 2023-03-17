const ResultModel = require('./modelResult');
const boom = require('@hapi/boom');

const resolverResult = {
    Query: {
        allResults : async () => {
            const results = await ResultModel.find();
            if (results.length) return results;
            throw boom.notFound('Results Not Found in DB');
        }
    },
    Mutation: {
        addResults : async (parent, args) => {
            try {
                const resultCreate = await ResultModel.create(args);
                return resultCreate;
            } catch (error) {
                throw boom.notFound(`No se pudo crear los Resultados, Error: ${error}`);
            }

        }
    }
}

module.exports = resolverResult;