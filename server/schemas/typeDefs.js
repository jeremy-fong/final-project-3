const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type Category {
    _id: ID 
    categoryTitle: String
   }

   type Comment {
    _id: ID
    commentBody: String
    username: String
    createdAt: String
   }

   type Thread {
    _id: ID
    username: String
    title: String
    description: String
   }

   type User {
      _id: ID
      username: String
      email: String
      picturePath: String
      followers: Int
   }

   type Auth {
      token: ID!
      user: User
   }

   type Query {
      me: User
   }

   input threadInput {
      threadId: String
      title: String
      description: String
   }

   type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      createThread(thread: String!): User
   }

`
module.exports = typeDefs