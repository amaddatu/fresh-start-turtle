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

  type Query {
    test: Message
    tech: [Tech]
    matchups(_id: String): [Matchup]
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
    signUp(name: String!, email: String!, password: String!): Auth 
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
