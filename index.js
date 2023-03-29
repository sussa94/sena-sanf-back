/* eslint-disable no-console */
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { validateToken } = require('./src/utils/tokenUtils');
const resolvers = require('./src/graphQL/resolvers');
const dbConfig = require('./src/dbConfig/dbConfig');
const typeDefs = require('./src/graphQL/typeDefs');
const mongoose = require('mongoose');
const app = require('./app.js');
const http = require('http');

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

mongoose.connect(dbConfig.dataBase, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Data Base Connected'))
.catch(err => console.log('Connect Error ', err));

const getUserData = token => {
  const verifyToken = validateToken(token);
  if (verifyToken.data) return verifyToken.data;
  return verifyToken.error;
}

const start = async () => {
  await server.start();
  app.use('/', expressMiddleware(server, {
    context: ({ req }) => {     // Cada peticion de GraphQL pasa por aqui
      const auth = req ? req.headers.authorization : null;    // headers con validacion
      if (auth && auth.toLowerCase().startsWith('bearer ')) {    // formato del token
        const token = auth.substring(7);
        const currentUser = getUserData(token);
        return { currentUser };
      }
    },
  }));
  await new Promise (resolve => httpServer.listen(dbConfig.port, resolve));
  console.log(`🚀 Server ready at http://localhost:${dbConfig.port}`);
}
start();
