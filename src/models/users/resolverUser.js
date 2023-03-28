const UserModel = require('./modelUser');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

const resolverUser = {
  Query: {
    allUsers: async (root, args, { currentUser }) => {
      if (currentUser) {
        if (currentUser.Rol === 'INSTRUCTOR') throw boom.unauthorized('User Not Autorized');
        let users;
        if (args.Rol) users = await UserModel.find({ Rol: args.Rol });
        else users = await UserModel.find();
        if (users.length) return users;
        throw boom.notFound('Users Not Found in DB');
      } else throw boom.unauthorized('User Not Authenticated');
    },
    getOneUser: async (root, args) => {
      const user = await UserModel.findOne({ Num_Documento: args.Num_Documento });
      if (!user) throw boom.notFound('User Not Found in DB');
      if (user.Active) return user;
      throw boom.conflict('User Is Not Active');
    }
  },
  Mutation: {
    createUser: async (root, args) => {      
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(args.Password, salt);
        args.Password = hashedPassword;
        const userCreated = await UserModel.create(args);
        return userCreated;
      } catch (error) { throw boom.conflict(`No se pudo crear el usuario, Error: ${error}`); }
    },
    updateUser: async (root, args, { currentUser }) => {
      if (!currentUser) throw boom.unauthorized('User Not Authenticated');
      try {
        const query = { _id: args._id };
        if (args.Password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(args.Password, salt);
          args.Password = hashedPassword;
        }
        const userUpdate = await UserModel.findByIdAndUpdate(query, args, { new: true });
        return userUpdate;
      } catch (error) { throw boom.notFound(error + ' Id No Existe'); }
    }
  }
}

module.exports = resolverUser;
