const express = require("express");
const expressRouter = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controller/userController');
const taskController = require('../controller/taskController');
const projectController = require('../controller/projectController');
const {sendResponse} = require("../globals");

function isTokenValid(req, res) {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	sendResponse(res, 200, true);
}

function protectRoute(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		return next();
	} catch (error) {
		sendResponse(res, 500, 'Please log in to access to this ressource');
	}
}

expressRouter.post('/api/verifyToken', isTokenValid);
expressRouter.post('/api/signup', userController.signUp);
expressRouter.post('/api/logIn', userController.logIn);

expressRouter.post('/api/addTask', protectRoute, taskController.addTask);
expressRouter.post('/api/addProject', protectRoute, projectController.addProject);

module.exports = expressRouter;
