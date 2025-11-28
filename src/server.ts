import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema/typeDefs";
import resolvers from "./resolvers/index";
import { logger } from "./utils/logger";


const PORT = process.env.PORT as string;
logger.info(`Starting server on port: ${PORT}`);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(PORT) },
  });
 logger.info(`🚀  Server ready at: ${url}`);
};

startServer().catch((err) => {
  logger.error("Error starting server:", err);
});

export { server };