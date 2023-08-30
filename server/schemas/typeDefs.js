const typeDefs = `
  type Message {
    message: String!
  }
  type Tech {
    _id: ID!
    name: String!
  }

  type User {
    _id: ID!
    name: String
    email: String
  }

  type Matchup {
    _id: ID!
    tech1: String!
    tech2: String!
    tech1_votes: Int
    tech2_votes: Int
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Movie{
    Title: String
    Rated: String
    Director: String
    Year: String
  }

  type GameHistory {
    _id: ID!
    createTime: String
    mainNumber: Int
    numberChoices: [Int]
    choice: Int
    win: Boolean
    userThatPlayed: User
  }

  input GameHistoryInput {
    mainNumber: Int!
    numberChoices: [Int]!
    choice: Int!
    win: Boolean!
  }


  type Query {
    test: Message
    tech: [Tech]
    matchups(_id: String): [Matchup]
    me: User
    searchMovie(movie: String!): Movie
    games: [GameHistory]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
    signUp(name: String!, email: String!, password: String!): Auth 
    login(email: String!, password: String!): Auth

    addGame(game: GameHistoryInput): GameHistory
  }
`;

module.exports = typeDefs;
