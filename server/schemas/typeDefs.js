const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String
    email: String
    password: String
    barStock: [Spirit]
    favourites: [Cocktails]
  }

  type Spirit {
    _id: ID
    name: String
    spiritType: String
  }

  type Cocktails {
    _id: ID
    cocktail: String
    description: String
    recipe: String
    ingredients: [String]
    imgLink: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    me: User
    barstock: [Spirit]
    faves: [Cocktails]
    allspirits: [Spirit]
    allcocktails: [Cocktails]
    possiblecocktails: [Cocktails]

  }

  type Mutation {
    addUser(firstname: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSpirit(name: String!, spiritType: String!): Spirit
    addExisting(_id: ID!): Spirit
    removeSpirit(_id: ID!): Spirit
    addCocktail(cocktail: String!, description: String, imgLink: String, recipe: String!, ingredients: [String]!): Cocktails
  }
`;

module.exports = typeDefs;
