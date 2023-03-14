import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
        username
      }
    }
  }
`;

export const ADD_THREAD = gql`

  mutation addThread($title: String!, $description: String!) {
    addThread(title: $title, description: $description) {
      _id
      title
      description
      threadAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`

// export const ADD_COMMENT = gql`
//   mutation addComment($threadId: ID!, $commentText: String!) {
//     addComment(threadId: $threadId, commentText: $commentText) {
//       _id
//       threadText
//       threadTitle
//       threadAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `