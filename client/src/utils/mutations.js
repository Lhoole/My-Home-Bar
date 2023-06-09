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

export const ADD_EXISTING_SPIRIT = gql`
mutation AddExisting($_id: ID!) {
    addExisting(_id: $_id) { 
    _id
    }
  }
`
export const REMOVE_SPIRIT = gql`
mutation  RemoveSpirit($_id: ID!) {
    removeSpirit(_id: $_id) { 
    _id
    }
  }
`
export const ADD_FAVOURITE = gql`
  mutation addFavourite($cocktailId: ID!, $isFavourite: Boolean!) {
    addFavourite(cocktailId: $cocktailId, isFavourite: $isFavourite) {
      _id
    }
  }
`
export const CHANGE_PASS = gql`
  mutation ChangePass($password: String!, $newpassword: String!) {
    changePass(password: $password, newpassword: $newpassword) {
      user {
        _id
      }
    }
  }
`

export const DELETE_ACC = gql`
  mutation DeleteAcc($password: String!) {
    deleteAcc(password: $password) {
      user {
        _id
      }
    }
  }
`