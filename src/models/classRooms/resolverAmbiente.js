const AmbienteModel = require('./modelAmbiente');
const boom = require('@hapi/boom');

const resolverAmbiente = {
  Query: {
    allAmbientes: async () => {
      const ambientes = await AmbienteModel.find();
      if (ambientes.length) return ambientes;
      throw boom.notFound('Ambientes Not Found in DB');
    }
  },
  Mutation: {
    addAmbientes: async (parent, args) => {
      try {
        const ambCreated = await AmbienteModel.create(args);
        return ambCreated;
      } catch (error) {
        throw boom.notFound(`No se pudo crear los Ambientes, Error: ${error}`);
      }
    }
  }
}

module.exports = resolverAmbiente;