const mongoose = require("mongoose");

const { Schema } = mongoose;

const listSchema = new Schema({
  title: String,
  firstColumnTitle: String,
  secondColumnTitle: String,
  thirdColumnTitle: { type: String, default: "Remarks" },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
  lastEditedAt: { type: Date, default: Date.now },
  active: Boolean,
});

const List = mongoose.model("List", listSchema);

module.exports = List;
