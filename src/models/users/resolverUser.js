/* eslint-disable no-unused-vars */
const UserModel = require('./modelUser');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

const resolverUser = {
    Query: {
        allUsers: async (parent, args) => {
            let users;
            if (args.Rol) users = await UserModel.find({ Rol: args.Rol });
            else users = await UserModel.find();
            if (users.length) return users;
            throw boom.notFound('Users Not Found in DB');
        },
        getOneUser: async (parent, args) => {
            const user = await UserModel.findOne({ Num_Documento: args.Num_Documento });
            if (!user) throw boom.notFound('User Not Found in DB');
            if (user.Active) return user;
            throw boom.conflict('User Is Not Active');
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(args.Password, salt);
                args.Password = hashedPassword;
                const userCreated = await UserModel.create(args);
                return userCreated;
            } catch (error) {
                throw boom.conflict(`No se pudo crear el usuario, Error: ${error}`);
            }
        },
        updateUser: async (parent, args) => {
            try {
                const query = { _id: args._id };
                if (args.Password) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(args.Password, salt);
                    args.Password = hashedPassword;
                }
                await UserModel.findByIdAndUpdate(query, args);
                return `User ${args._id} Update OK`;
            } catch (error) {
                throw boom.notFound(error + ' Id No Existe');
            }
        }
    }
}

module.exports = resolverUser;
