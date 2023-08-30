const { isLoggedIn } = require('./shared');
const { Types } = require('mongoose');
const { Tech, Matchup, User, GameHistory } = require('../models');

require('dotenv').config();
const gameResolvers = {
  Query: {
    games: async (parent, {}, context) => {
      if(!isLoggedIn(context)){
        throw new Error("Not logged in");
      }
      console.log(context);
      let games = await GameHistory.find({
        userThatPlayed: context.user._id
      }).sort({createTime: 'descending'}).populate('userThatPlayed');
      // serialize an array to an array of plain objects
      games = games.map( game => game.toObject() );
      console.log(JSON.stringify(games, null, 2));
      return games;
    }
  },
  Mutation: {
    // renamed game input argument to gameInfo
    addGame: async (parent, {game:gameInfo} , context) => {
      if(!isLoggedIn(context)){
        throw new Error("Not logged in");
      }

      let game = await GameHistory.create( {
        // ... or spread means copy and paste key values pairs to create method
        ...gameInfo,
        // added my user id as a new ObjectId
        userThatPlayed: new Types.ObjectId(context.user._id)
      });
      game = game.toObject();
      console.log(JSON.stringify(game, null, 2));

      return game;
    },
  }
}
module.exports = {
  gameResolvers
}