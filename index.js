const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const UserModel = require('./src/models/users/modelUser');
const resolvers = require('./src/graphQL/resolvers');
const dbConfig = require('./src/dbConfig/dbConfig');
const typeDefs = require('./src/graphQL/typeDefs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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

const start = async () => {
  await server.start();
  app.use('/', expressMiddleware(server, {
    context: async ({ req }) => {     // Cada peticion de GraphQL pasa por aqui
      const auth = req ? req.headers.authorization : null;    // headers con validacion
      if (auth && auth.toLowerCase().startsWith('bearer ')) {    // formato del token
        const token = auth.substring(7);
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await UserModel.findById(decodeToken.id);
        return { currentUser };
      }
    },
  }));
  await new Promise (resolve => httpServer.listen(dbConfig.port, resolve));
  console.log(`🚀 Server ready at http://localhost:${dbConfig.port}`);
}
start();
