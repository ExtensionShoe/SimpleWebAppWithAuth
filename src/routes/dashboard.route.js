const { verify } = require("../middleware/verify");
const path = require("path");

module.exports = function (app) {
	app.get("/", verify, (req, res) => {
		res.sendFile(path.resolve(__dirname + "/../public/html/dashboard.html"));
	});
};