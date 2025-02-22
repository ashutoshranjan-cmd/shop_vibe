const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, sparse: true },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    sparse: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
