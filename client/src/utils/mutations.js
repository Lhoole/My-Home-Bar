import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($firstname: String!, $email: String!, $password: String!) {
    addUser(firstname: $firstname, email: $email, password: $password) {
      user {
        email
        _id
      }
      token
    }
  }
`

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        _id
      }
    }
  }
`

export const ADD_SPIRIT = gql`
mutation AddSpirit($name: String!, $spiritType: String!) {
    addSpirit(name: $name, spiritType: $spiritType) { 
    _id
    name
    spiritType
    }
  }
`