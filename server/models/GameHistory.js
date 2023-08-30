const { Schema, model } = require('mongoose');

const gameHistorySchema = new Schema({
  createTime: {
    type: Schema.Types.Date,
    required: true,
    default: Date.now,
  },
  mainNumber: {
    type: Schema.Types.Number,
    required: true
  },
  numberChoices: [
    {
      type: Schema.Types.Number
    }
  ],
  choice: {
    type: Schema.Types.Number,
    required: true
  },
  win: {
    type: Schema.Types.Boolean,
    required: true
  },
  userThatPlayed: {
    type: Schema.Types.ObjectId,
    // reference is the related model
    ref: 'User',
    required: true
  }
});

const GameHistory = model('GameHistory', gameHistorySchema);

module.exports = GameHistory;
