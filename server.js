require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const connectDB = require('./config/database');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
    };
  },
  introspection: true,
});

// Start server
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req }) => {
      // You can add authentication context here
      return { req };
    },
  });

  console.log(`🚀 Server ready at ${url}`);
  console.log(`📝 GraphiQL available at ${url}`);
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
