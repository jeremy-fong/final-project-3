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
    createdAt: Date
   }

   type Thread {
    _id: ID
    threadText: String
    createdAt: Date
    username: String
   }

   type User {
      _id: ID
      firstName: String
      lastName: String
      email: String
      threads: [Thread]
      followers: [User]
    }

`
module.exports = typeDefs