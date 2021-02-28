const { verify } = require("../middleware/verify");
const path = require("path");
const { upload } = require("../middleware/upload/imgupload");

module.exports = function (app) {
	app.get("/", verify, (req, res) => {
		res.sendFile(path.resolve(__dirname + "/../public/html/dashboard.html"));
	});

	app.post("/upload", [verify, upload.single("myImage")], (req, res) => {
		try {
			return res.json({ upload: "successful" });
		} catch (error) {
			return res.json({ upload: "failed" });
		}
	});
};