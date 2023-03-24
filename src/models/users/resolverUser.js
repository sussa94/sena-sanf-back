const UserModel = require('./modelUser');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolverUser = {
  Query: {
    allUsers: async (root, args, context) => {
      const { currentUser } = context;
      if (currentUser) {
        if (currentUser.Rol !== 'ADMINISTRADOR') throw boom.unauthorized('User Not Autorized');
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
    },
    me: (root, args, context) => context.currentUser
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
    updateUser: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) throw boom.unauthorized('User Not Autorized');
      try {
        const query = { _id: args._id };
        if (args.Password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(args.Password, salt);
          args.Password = hashedPassword;
        }
        await UserModel.findByIdAndUpdate(query, args);
        return `User ${args._id} Update OK`;
      } catch (error) { throw boom.notFound(error + ' Id No Existe'); }
    },
    loginUser: async (root, args) => {
      const user = await UserModel.findOne({ Num_Documento: args.Num_Documento });
      if (user) {
        if (!user.Active)
          throw boom.conflict('Lo sentimos, su Usuario se encuentra Inactivo, por favor comuniquese con el Administrador');
        const { Num_Documento, Tipo_Documento, Password } = user;
        if (Tipo_Documento === args.Tipo_Documento && Num_Documento === args.Num_Documento) {
          const valid = await bcrypt.compare(args.Password, Password);
          if (!valid) throw boom.notFound('Lo sentimos, los Datos ingresados No son validos, Verifiquelos');
          const userForToken = {
            id: user._id,
            Num_Documento,
            Rol: user.Rol
          }
          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
      } else {
        throw boom.conflict(`Lo sentimos, los Datos ingresados No son validos, Verifiquelos, o Registrese`);
      }
    }
  }
}

module.exports = resolverUser;
