const typeDefsAuth = `#graphql

  type Token {
    token: String
    error: String
  }

  type Mutation { 
    registerUser(
      Nombre: String!,
      Apellido: String!,
      Tipo_Documento: Enum_Type_Doc!,
      Num_Documento: String!,
      Email: String!,
      Password: String!,
      Rol: Enum_Rol!,
    ) : Token!

    loginUser(
      Tipo_Documento: Enum_Type_Doc!,
      Num_Documento: String!,
      Password: String!
    ) : Token!

    refreshToken: Token!
  } 
`;

module.exports = typeDefsAuth;