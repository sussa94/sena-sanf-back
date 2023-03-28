const typeDefsUser = `#graphql

    enum Enum_Type_Doc { CEDULA_DE_CIUDADANIA TARJETA_DE_IDENTIDAD CEDULA_DE_EXTRANJERIA PEP PERMISO_DE_PROTECCION_TEMPORAL }
    enum Enum_Rol { ADMINISTRADOR INSTRUCTOR FUNCIONARIO }

    type User {
        _id: ID!,
        Nombre: String!,
        Apellido: String!,
        Tipo_Documento: Enum_Type_Doc!,
        Num_Documento: String!,
        Email: String!,
        Password: String!,
        Rol: Enum_Rol!,
        Active: Boolean!
    }

    type Query {
        allUsers( Rol: Enum_Rol ) : [User]
        getOneUser( Num_Documento: String! ) : User
    }
    type Mutation {
        createUser(
            Nombre: String!,
            Apellido: String!,
            Tipo_Documento: Enum_Type_Doc!,
            Num_Documento: String!,
            Email: String!,
            Password: String!,
            Rol: Enum_Rol!,
        ) : User

        updateUser(
            _id: ID!,
            Tipo_Documento: Enum_Type_Doc,
            Num_Documento: String,
            Email: String,
            Password: String,
            Rol: Enum_Rol,
            Active: Boolean
        ) : User
    }
`;

module.exports = typeDefsUser;