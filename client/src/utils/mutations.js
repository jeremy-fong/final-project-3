import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_THREAD = gql`

  mutation addThread($threadTitle: String!, $threadText: String!) {
    addThread(threadTitle: $threadTitle, threadText: $threadText) {
      _id
      threadTitle
      threadText
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(threadId: $threadId, commentText: $commentText) {

  mutation addThread($threadText: String!) {
    addThread(threadText: $threadText) {

      _id
      threadText
      threadAuthor
      createdAt
      comments {
        _id
        commentText

        createdAt
      }
    }
  }
`

 
