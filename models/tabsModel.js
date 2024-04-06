const mongoose = require("mongoose");

const tabsSchema = {
    type: String,
    fields: Object,
    createdBy: isObjectIdOrHexString,
    team: isObjectIdOrHexString
}

const tabsModel = mongoose.model("tab", tabsSchema);

module.exports = {
    tabsModel
}