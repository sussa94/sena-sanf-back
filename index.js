/* eslint-disable no-console */
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const dbConfig = require('./src/dbConfig/dbConfig');
const resolvers = require('./src/graphQL/resolvers');
const typeDefs = require('./src/graphQL/typeDefs');
const mongoose = require('mongoose');
const app = require('./app.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(dbConfig.dataBase, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Data Base Connected'))
  .catch(err => console.log('Connect Error ', err));

app.listen(dbConfig.port, async () => {
  await server.start();
  app.use(expressMiddleware(server));
  console.log(`🚀 Server ready at http://localhost:${dbConfig.port}`);
});
