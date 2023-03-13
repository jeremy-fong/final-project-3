import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      threads {
        _id
        title
        description
        username
        createdAt
      }
    }
  }
`;

export const QUERY_THREADS = gql`
  query getThreads {
    threads {
      _id
      title
      description
      username
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THREAD = gql`
  query getSingleThread($threadId: ID!) {
    thread(threadId: $threadId) {
      _id
      title
      description
      username
      createdAt
      comments {
        _id
        commentBody
        username
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
