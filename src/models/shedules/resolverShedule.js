const SheduleModel = require("./modelShedule");
const boom = require("@hapi/boom");

const resolverShedule = {
  Query: {
    allShedules: async () => {
      const shedules = await SheduleModel.find().populate('Instructor');
      if (shedules.length) return shedules;
      throw boom.notFound('Shedules Not Found in DB');
    },
    getOneShedule: async (parent, args) => {
      const query = { Instructor: args.Instructor };
      const shedule = await SheduleModel.findOne(query);
      if (shedule) return shedule;
      throw boom.notFound(`El ID ${args.Instructor} No Existe`);
    }
  },
  Mutation : {
    addShedule: async (parent, args) => {
      try {
        const sheduleCreate = await SheduleModel.create(args);
        return sheduleCreate;
      } catch(error) {
        throw boom.notFound(`No se pudo crear el Horario, Error: ${error}`);
      }
    },
    updateShedule: async (parent, args) => {
      const query = { _id: args._id };
      const sheduleUp = await SheduleModel.findByIdAndUpdate(query, args, { new: true });
      if (sheduleUp) return sheduleUp;
      throw boom.notFound(`El ID ${args._id} No Existe`);
    }
  }
}

module.exports = resolverShedule;