const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controller/userController');
const taskController = require('../controller/taskController');
const projectController = require('../controller/projectController');
const {sendResponse} = require("../globals");


function isAuthenticated(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		// const userId = decodedToken.userId;

		return next();
	} catch (error) {
		sendResponse(res, 500, 'Please log in to acces to this ressource');
	}
}

router.post('/signup', userController.signUp);
router.post('/logIn', userController.logIn);

router.post('/addTask', isAuthenticated, taskController.addTask);
router.post('/addProject', isAuthenticated, projectController.addProject);

module.exports = router;
