const typeDefsAmb = `#graphql
  type Ambiente {
    _id: ID!,
    Ambientes: [String!],
  }
  type Query { allAmbientes : [Ambiente] }
  type Mutation { addAmbientes( Ambientes: [String!] ) : Ambiente }
`;

module.exports = typeDefsAmb;