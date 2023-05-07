import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($firstname: String!) {
    user(firstname: $firstname) {
      _id
      username
      email
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstname
      email
      barStock {
        _id
        name
        spiritType
      }
      favourites {
        _id
        cocktail
      }
    }
  }
`;
