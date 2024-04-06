const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    contact: String,
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    designation: String,
    permissions: Object,
    accountSettings: Object,
    verified: Boolean
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
    userModel
}