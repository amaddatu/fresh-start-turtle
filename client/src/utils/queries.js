import { gql } from '@apollo/client';

export const QUERY_MESSAGE = gql`
query Excellent {
  test {
    message
  }
}
`;

export const QUERY_ME = gql`
query Me {
  me {
    _id
    email
    name
  }
}
`
export const QUERY_GAMES = gql`
query GAMES {
  games {
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