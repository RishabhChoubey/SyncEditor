const mongoose = require("mongoose");
require("dotenv").config();
const { MONGOURI } = require("./utility/key");
const Document = require("./model/Document");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const user = require("./route/UserRoute");
const socket = require("socket.io");
const { isAuth, isAuthSocket, createOrGetDocument, isValide, getUserCreatedDocument } = require("./utility/util");
const { useSocket } = require("./utility/useSocket");

const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", user);
const io = socket(server);

try {
  mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  });

  console.log("conected....to mongoose");
} catch (error) {
  console.log(error);
}
app.get("/doc/", isAuth, async (req, res) => {
  const dat = await Document.find({ userId: req.user.id }).populate("userId");
  res.json({ data: dat });
});
app.get("/docInvite/", isAuth, async (req, res) => {
  const dat = await Document.find({ guestId: req.user.name }).populate(
    "userId"
  );
  res.json({ data: dat });
});

useSocket(io)

server.listen(4000, () => {
  console.log("connected to server");
});
