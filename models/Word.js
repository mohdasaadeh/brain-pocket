const mongoose = require("mongoose");

const { Schema } = mongoose;

const wordSchema = new Schema({
  word: String,
  columnTitle: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
  lastEditedAt: { type: Date, default: Date.now },
  active: Boolean,
});

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;
