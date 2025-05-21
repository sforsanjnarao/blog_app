//server.js
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const connectDB = require('./db/db');

require('dotenv').config();
async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  //this apllo server is for graphql
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();
  app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res })
  })
);

  const PORT = process.env.PORT || 4000;
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
}

startServer();