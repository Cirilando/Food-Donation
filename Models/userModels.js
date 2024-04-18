const mongoose = require("mongoose");
const user = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  userid: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  emialid: {
    type: String,
  },
  message: {
    type: String,
  },
});
const userDB = mongoose.model("ciril", user);
module.exports = userDB;
