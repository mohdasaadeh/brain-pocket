const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  username: String,
  email: {
    type: String,
    required: true,
  },
  password: String,
  createdAt: { type: Date, default: Date.now },
  lastEditedAt: { type: Date, default: Date.now },
  active: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
