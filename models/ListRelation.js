const mongoose = require("mongoose");

const { Schema } = mongoose;

const listRelationSchema = new Schema({
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

const ListRelation = mongoose.model("ListRelation", listRelationSchema);

module.exports = ListRelation;
