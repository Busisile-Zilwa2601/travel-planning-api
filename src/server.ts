import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema/typeDefs";
import resolvers from "./resolvers/index";


const PORT = process.env.PORT as string;
console.log('Starting server on port:', PORT);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(PORT) },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});

export { server };