/* eslint-disable no-console */
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const dbConfig = require('./src/dbConfig/dbConfig');
const resolvers = require('./src/graphQL/resolvers');
const typeDefs = require('./src/graphQL/typeDefs');
const mongoose = require('mongoose');
const app = require('./app.js');
const http = require('http');

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

mongoose.connect(dbConfig.dataBase, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Data Base Connected'))
.catch(err => console.log('Connect Error ', err));

const start = async () => {
  await server.start();
  app.use('/', expressMiddleware(server));
  await new Promise (resolve => httpServer.listen(dbConfig.port, resolve));
  console.log(`🚀 Server ready at http://localhost:${dbConfig.port}`);
}
start();
