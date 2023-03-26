const UserModel = require('../../models/users/modelUser');
const boom = require('@hapi/boom');
const generateToken = require('../../utils/tokenUtils');
const bcrypt = require('bcryptjs');

const resolverAuth = {
  Mutation: {
    registerUser: async (root, args) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(args.Password, salt);
        args.Password = hashedPassword;
        const userRegister = await UserModel.create(args);
        return {
          token: generateToken({
            _id: userRegister._id,
            Nombre: userRegister.Nombre,
            Apellido: userRegister.Apellido,
            Num_Documento: userRegister.Num_Documento,
            Email: userRegister.Email,
            Rol: userRegister.Rol,
            Active: userRegister.Active
          })
        };
      } catch (error) { throw boom.conflict(`No se pudo crear el usuario, Error: ${error}`); }
    }
  }
}

module.exports = resolverAuth;