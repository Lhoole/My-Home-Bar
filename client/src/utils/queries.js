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

export const QUERY_BARSTOCK = gql`
  query barstock {
    me {
      _id
      barStock {
        name
        spiritType
        _id
      }
    }
  }
`;

export const QUERY_FAVES = gql`
  query faves {
    me {
      _id
      favourites {
        _id
        cocktail
      }
    }
  }
`;

export const QUERY_ALLSPIRITS = gql`
query allspirits {
  allspirits {
    name
    spiritType
    _id
  }
}
`;

export const QUERY_POSSIBLECOCKTAILS = gql`
query possiblecocktails{
  possiblecocktails{
    _id
    cocktail
    ingredients
    description
    recipe
    imgLink
  }
}
`;
export const QUERY_AllCOCKTAILS = gql`
query allcocktails{
  allcocktails {
    _id
    cocktail
    ingredients
    description
    recipe
    imgLink
  }
}
`;