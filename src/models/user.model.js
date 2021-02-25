const mongoose = require("mongoose");
exports.User = new mongoose.model("User", new mongoose.Schema({
	email: String,
	passHash: String,
	role: String,
	fName: String,
	lName: String
}));