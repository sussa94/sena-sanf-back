const ProgramModel = require('./modelPrograms');
const boom = require('@hapi/boom');

const resolverProgram = {
  Query: {
    allPrograms: async () => {
      const programs = await ProgramModel.find();
      if (programs.length) return programs;
      throw boom.notFound('Programs Not Found in DB');
    },
    allProgramsName: async () => {
      const namesProg = await ProgramModel.find();
      if (!namesProg.length) throw boom.notFound('Names Not Found in DB');
      return namesProg.map(e => e.Nombre);
    },
    getOneProgram: async (parent, args) => {
      const query = { Nombre: args.Nombre }
      const program = await ProgramModel.findOne(query)
        .populate('Competencias').populate('Resultados');
      if (program) return program;
      throw boom.notFound(`El Programa ${args.Nombre} No Existe`);
    }
  },
  Mutation: {
    addProgram: async (parent, args) => {
      try {
        const programCreate = await ProgramModel.create(args);
        return programCreate;
      } catch (error) {
        throw boom.notFound(`No se pudo crear el Programa, Error: ${error}`);
      }
    }
  }
}

module.exports = resolverProgram;