const mongoose = require("mongoose");
const MongoUrl ="mongodb+srv://cirilando2244:AybwpbQL7gJiURA5@cluster0.abteguf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connect =()=>{
  mongoose.connect(MongoUrl)
  .then(() => {
    console.log("MongoDB is connected")
  }).catch((err) => {
    console.log("Not connected")
  });
}
module.exports = connect;
