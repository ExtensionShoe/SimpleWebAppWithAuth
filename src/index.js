const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/auth.route")(app);
require("./routes/dashboard.route")(app);


app.listen(PORT, () => {
	console.log(`App is starting on port: ${PORT}.`);
});


mongoose.connect("mongodb://127.0.0.1:27017/app", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Connected to MongoDB");
});