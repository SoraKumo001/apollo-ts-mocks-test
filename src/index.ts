import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
type User {
  id: ID!
  name: String!
}

type Company {
  id: ID!
  name: String!
}

type Query {
  user(id: Int, name: String): User,
  company(id: Int, name: String): Company,
  allUser: [User]
}

type Mutation {
  user(name: String): String!
}
`;

const users = [
  { id: 1, name: "ushumpei" },
  { id: 2, name: "apollo" }
];
export const resolvers = {
  Query: {
    user: ()=>users[0],
    allUser: ()=>users
  },
};

const app = express();

const server = new ApolloServer({
  typeDefs,
  mocks:true,
  resolvers,
  playground: {
    endpoint: "/graphql",
  }
});
server.applyMiddleware({
  app
});

app.listen(3000, () =>
  console.log(
    "http://localhost:3000/graphql\n"
  )
);
