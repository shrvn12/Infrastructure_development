const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  name: String,
  permissions: Object,
  teamSettings: Object,
});

const teamModel = mongoose.model("team", teamSchema);

module.exports = {
  teamModel,
};
