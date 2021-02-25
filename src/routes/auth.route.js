const bcrypt = require("bcrypt");
const path = require("path");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
module.exports = function (app) {
	app.post("/signup", (req, res) => {
		let email = req.body.email;
		let password = req.body.password;
		let fName = req.body.fname;
		let lName = req.body.lname;
		let role = req.body.role;
		User.findOne({ email: email }).exec((err, foundUser) => {
			if (foundUser) {
				res.json({error: "A user with this email address already exists!"});
				return;
			}

			let hash = bcrypt.hashSync(password, 12);

			let user = new User({ email: email, passHash: hash, role: role, fName: fName, lName: lName });
			user.save().then(() => {
				res.json({ redirect: "/" });
			}).catch(error => {
				console.log(error);
			});
		});
	});

	app.post("/login", (req, res) => {
		let email = req.body.email;
		let password = req.body.password;
		User.findOne({ email: email }).exec((err, user) => {
			if (user !== null && bcrypt.compareSync(password, user.passHash)) {
				let token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
				res.cookie("accessToken", token, { httpOnly: true });
				res.json({ redirect: "/" });
			} else {
				res.json({});
			}
		});
	});

	app.get("/signup", (req, res) => {
		res.sendFile(path.resolve(__dirname + "/../public/html/signup.html"));
	});

	app.get("/login", (req, res) => {
		res.sendFile(path.resolve(__dirname + "/../public/html/login.html"));
	});
};