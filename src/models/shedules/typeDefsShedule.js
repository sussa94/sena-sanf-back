const typeDefsShedule = `#graphql

  type Shedule {
    _id: ID!,
    Instructor: User!,
    Horario: [TypeShedule]
  }
  type TypeShedule {
    FechaInicio: String,
    FechaFin: String,
    Ficha: [TypeFicha],
    Complementaria: [String],
    Planta: Boolean,
    Horas: [TypeHours]
  }
  input SheduleInput {
    FechaInicio: String,
    FechaFin: String,
    Ficha: [FichaInput],
    Complementaria: [String],
    Planta: Boolean,
    Horas: [HoursInput]
  }
  type TypeFicha {
    Num_Ficha: String!,
    Num_Ruta: String!,
    Trimestre: String!,
    Codigo: String,
    Color: Int!,
    Programa: String!,
    Num_Aprendices: String,
    Ambiente: String!,
    Competencias: [String]!,
    Resultados: [String]!,
    Descripcion: String,
  }
  input FichaInput {
    Num_Ficha: String!,
    Num_Ruta: String!,
    Trimestre: String!,
    Codigo: String,
    Color: Int!,
    Programa: String!,
    Num_Aprendices: String,
    Ambiente: String!,
    Competencias: [String]!,
    Resultados: [String]!,
    Descripcion: String,
  }
  type TypeHours {
    pos: Int!,
    color: String!,
    Ambiente: String
  }
  input HoursInput {
    pos: Int!,
    color: String!,
    Ambiente: String
  }

  type Query {
    allShedules: [Shedule]
    getSheduleClassRoom( FechaInicio: String!, Ambiente: String! ) : [Int]
    getOneShedule( Instructor: ID! ) : Shedule
  }
  type Mutation {
    addShedule(
      Instructor: ID!,
      Horario: [SheduleInput]
    ) : Shedule

    updateShedule(
      _id: ID!
      Horario: [SheduleInput]
    ) : Shedule
  }
`;

module.exports = typeDefsShedule;