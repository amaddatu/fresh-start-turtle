import { gql } from '@apollo/client';

export const MUTATION_LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      name
    }
  }
}
`;

export const MUTATION_ADD_GAME = gql`
mutation ADDGAME($game: GameHistoryInput) {
  addGame(game: $game) {
    _id
    choice
    createTime
    mainNumber
    numberChoices
    userThatPlayed {
      _id
      email
      name
    }
    win
  }
}
`;