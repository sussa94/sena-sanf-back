const ProgramModel = require('./modelPrograms');
const boom = require('@hapi/boom');

const resolverProgram = {
    Query : {
        allPrograms : async () => {
            const programs = await ProgramModel.find();
            if (programs.length) return programs;
            throw boom.notFound('Programs Not Found in DB');
        },
        getOneProgram : async (parent, args) => {
          const program = await ProgramModel.findById(args._id)
            .populate('Competencias').populate('Resultados');
          if (program) return program;
          throw boom.notFound(`El ID ${args._id} No Existe`);
        }
    },
    Mutation : {
        addProgram : async (parent, args) => {
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