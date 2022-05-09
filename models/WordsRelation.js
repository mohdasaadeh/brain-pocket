const mongoose = require("mongoose");

const { Schema } = mongoose;

const wordsRelationSchema = new Schema({
  firstWordId: {
    type: Schema.Types.ObjectId,
    ref: "Word",
  },
  secondWordId: {
    type: Schema.Types.ObjectId,
    ref: "Word",
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: "List",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
  active: Boolean,
});

const WordsRelation = mongoose.model("WordsRelation", wordsRelationSchema);

module.exports = WordsRelation;
