const express = require("express");
const expressRouter = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controller/userController');
const taskController = require('../controller/taskController');
const projectController = require('../controller/projectController');
const {sendResponse} = require("../../globals");
const {JsonWebTokenError} = jwt;

function isTokenValid(req, res) {
	try {
		const token = req.headers.authorization.split(" ")[1];

		if (token == 'undefined') {
			sendResponse(res, 400, 'Invalid token');
			return;
		}

		const decodedToken = jwt.verify(token, "TOKEN_SECRET");
		sendResponse(res, 200, true);
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			console.error('JWT is malformed:', error);
			sendResponse(res, 400, 'Invalid token');
		} else {
			console.error('An unexpected error occurred:', error);
			sendResponse(res, 500, 'An unexpected error occurred');
		}
	}
}

function protectRoute(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "TOKEN_SECRET");

		return next();
	} catch (error) {
		sendResponse(res, 500, 'Please log in to access to this ressource');
	}
}

expressRouter.post('/api/verifyToken', isTokenValid);
expressRouter.post('/api/signup', userController.signUp);
expressRouter.post('/api/logIn', userController.logIn);

expressRouter.get('/api/getTasks', protectRoute, taskController.getTasks);
expressRouter.post('/api/addTask', protectRoute, taskController.addTask);
expressRouter.get('/api/getProjects', protectRoute, projectController.getProjects);
expressRouter.post('/api/addProject', protectRoute, projectController.addProject);

module.exports = expressRouter;
