const mongoose = require("mongoose");

const accessSchema = mongoose.Schema({
  accessLevel: Number,
  permissions: Object,
});

const accessModel = mongoose.model('Level', accessSchema);

module.exports = { accessModel };
