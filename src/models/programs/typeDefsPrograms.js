const typeDefsPrograms = `#graphql

    type Program {
        _id: ID!,
        Nombre: String!,
        Competencias: Competence!,
        Resultados: Result!,
    }
    type Query {
      allPrograms: [Program]
      getOneProgram( Nombre: String! ) : Program
    }
    type Mutation {
        addProgram(
            Nombre: String!,
            Competencias: String!,
            Resultados: String!
        ) : Program
    }
`;

module.exports = typeDefsPrograms;