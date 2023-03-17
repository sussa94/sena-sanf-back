const typeDefsResult = `#graphql

    type Result {
        _id: ID!,
        Resultados: [Results]!
    }
    type Results {
        Nombre: String!,
        ResultComp: [String]!
    }
    type Query { allResults: [Result] }
    type Mutation { addResults( Resultados: [ResultsInput]! ) : Result }
    input ResultsInput {
        Nombre: String!,
        ResultComp: [String]!
    }
`;

module.exports = typeDefsResult;