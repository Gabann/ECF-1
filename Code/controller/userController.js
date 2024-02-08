const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {sequelize} = require("../config/databaseConnection");
const User = require('../model/userModel')(sequelize);
const {sendResponse} = require("../globals");

const userController = {

	signUp: async (req, res) => {
		try {
			let username = req.body.username;
			let password = req.body.password;
			let email = req.body.email;

			let hashedPassword = await bcrypt.hash(password, 10);
			await User.create({username: username, email: email, password: hashedPassword});

			sendResponse(res, 201, "User added successfully, redirecting...");
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
		}
	},

	logIn: async (req, res) => {
		console.log(req.body);
		try {
			let username = req.body.username;
			let password = req.body.password;

			const user = await User.findOne({where: {username: username}});
			if (!user) {
				return sendResponse(res, 401, "Username or password incorrect");
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return sendResponse(res, 401, "Username or password incorrect");
			}

			const token = jwt.sign({userId: user.id}, "RANDOM_TOKEN_SECRET", {
				expiresIn: "30d",
			});

			sendResponse(res, 200, "Successfully logged in, redirecting...", {token: token});
		} catch (error) {
			sendResponse(res, 500, error.message);
		}
	},
};

module.exports = userController;