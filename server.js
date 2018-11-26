const express = require('express');
const path = require('path');
const db = require('./models');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tinyImprovements";
const routes = require("./routes/api-routes.js");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
// =============================================================
// require('./routes/api-routes.js')(app);
app.use(routes);

mongoose.connect(MONGODB_URI);
	app.listen(PORT, function () {
		console.log('App listening on PORT ' + PORT);
	});
// db.sequelize.sync({}).then(function () {
// 	app.listen(PORT, function () {
// 		console.log('App listening on PORT ' + PORT);
// 	});
// });