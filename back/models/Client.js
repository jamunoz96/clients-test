const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  names: String,
  document: Number,
  address: String,
  phone: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Client", clientSchema);
