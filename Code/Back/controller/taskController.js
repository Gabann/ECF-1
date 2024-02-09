const {sequelize} = require("../config/databaseConnection");
const {sendResponse} = require("../../globals");
const jwt = require("jsonwebtoken");
const databaseModel = require('../model/databaseModel')(sequelize);

const taskController = {
	addTask: async (req, res) => {
		try {
			let taskName = req.body.taskName;
			let taskDescription = req.body.taskDescription;
			let taskPriority = req.body.taskPriority;

			await databaseModel.Task.create({taskName: taskName, taskDescription: taskDescription, taskPriority: taskPriority});


			sendResponse(res, 201, "Task added successfully");
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
		}
	},

	getTasks: async (req, res) => {
		try {
			let token = jwt.verify(req.headers.authorization.split(" ")[1], "TOKEN_SECRET");
			let userId = token.userId;

			const tasks = await databaseModel.Task.findAll();

			sendResponse(res, 200, 'Tasks fetched successfully', {tasks: tasks});
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
		}
	},
};

module.exports = taskController;