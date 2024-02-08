const {sequelize} = require("../config/databaseConnection");
const {sendResponse} = require("../../globals");
const Task = require('../model/taskModel')(sequelize);

const taskController = {
	addTask: async (req, res) => {
		try {
			let taskName = req.body.taskName;
			let taskDescription = req.body.taskDescription;
			let taskPriority = req.body.taskPriority;

			await Task.create({taskName: taskName, taskDescription: taskDescription, taskPriority: taskPriority});

			sendResponse(res, 201, "Task added successfully");
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
		}
	},
};

module.exports = taskController;