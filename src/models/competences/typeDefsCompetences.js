const typeDefsCompetences = `#graphql

    type Competence {
        _id: ID!,
        Competencias : [String]!
    }   
    type Query { allCompetences : [Competence] }
    type Mutation {
        addCompetences(
            Competencias : [String]!
        ) : Competence
    }
`;

module.exports = typeDefsCompetences;