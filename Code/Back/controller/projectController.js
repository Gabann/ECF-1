const {sequelize} = require("../config/databaseConnection");
const {sendResponse} = require("../../globals");
const Project = require('../model/projectModel')(sequelize);

const projectController = {
	addProject: async (req, res) => {
		try {
			let projectName = req.body.projectName;
			let projectDescription = req.body.projectDescription;

			await Project.create({projectName: projectName, projectDescription: projectDescription});

			sendResponse(res, 200, 'Project added successfully');
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
		}
	},
};

module.exports = projectController;