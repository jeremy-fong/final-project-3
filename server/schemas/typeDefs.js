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
    title: String
    body: String
    createdAt: String
    username: String
   }

   type User {
      _id: ID
      username: String
      email: String
      threads: [Thread]
      followerCount: Int
   }

   type Auth {
      token: ID!
      user: User
   }

   type Query {
      me: User
   }

   input threadInput {
      creator: String
      threadId: String
      title: String
      text: String
   }

   type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      createThread(thread: threadInput): User
      removeThread(threadId: String!): User
   }

`
module.exports = typeDefs