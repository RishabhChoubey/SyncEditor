const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.String, ref: "User", required: true },
  _id: {
    type: String,
  },
  data: {
    type: Object,
    require: true,
  },
  guestId: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
  expireAt: {
    type: Date,
    default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

module.exports = mongoose.model("Document", Schema);
