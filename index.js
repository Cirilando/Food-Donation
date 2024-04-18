const express = require("express");
const cors = require("cors")
const connect = require("./common/connection");
const router = require("./Route/userRouter");
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
connect();

const port = 9000;
app.listen(port, () => {
  console.log("My Port Number Is", port);
});
