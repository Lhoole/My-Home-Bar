const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String
    email: String
    password: String
    barStock: [Spirit]!
  }

  type Spirit {
    _id: ID
    name: String
    spiritType: String
  }

  type Cocktail {
    _id: ID
    cocktail: String
    description: String
    recipe: String
    ingredients: [Spirit]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    me: User
  }

  type Mutation {
    addUser(firstname: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
