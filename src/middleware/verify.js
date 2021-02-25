const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
exports.verify = function (req, res, next) {
	let token = req.cookies.accessToken;
	if (!token) {
		return res.redirect("/login");
	}

	try {
		let payload = jwt.verify(token, process.env.SECRET_KEY);
		User.findOne({ _id: payload.id }).exec((err, foundUser) => {
			if (foundUser) {
				res.locals.payload = payload;
				next();
			}
			else {
				return res.redirect("/login");
			}
		});
	} catch (error) {
		return res.redirect("/login");
	}
};