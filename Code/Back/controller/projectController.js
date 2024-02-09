const {sequelize} = require("../config/databaseConnection");
const {sendResponse} = require("../../globals");
const jwt = require("jsonwebtoken");
const databaseModel = require('../model/databaseModel')(sequelize);

const projectController = {
	addProject: async (req, res) => {
		try {
			let projectName = req.body.projectName;
			let projectDescription = req.body.projectDescription;

			let token = jwt.verify(req.headers.authorization.split(" ")[1], "TOKEN_SECRET");
			let creatorId = token.userId;


			if (!projectName || !projectDescription || !creatorId) {
				return sendResponse(res, 400, 'Project name, description, and creator ID are required');
			}

			let project = await databaseModel.Project.create({projectName: projectName, projectDescription: projectDescription});

			project.addUser(creatorId);

			sendResponse(res, 200, 'Project added successfully');
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
		}
	},

	getProjects: async (req, res) => {
		try {
			let token = jwt.verify(req.headers.authorization.split(" ")[1], "TOKEN_SECRET");
			let userId = token.userId;

			const projects = await databaseModel.Project.findAll({
				include: [{
					model: databaseModel.User,
					where: {id: userId},
					through: {attributes: []},
				}],
			});

			sendResponse(res, 200, 'Projects fetched successfully', {projects});
		} catch (error) {
			console.error(error);
			sendResponse(res, 500, error.errors[0].message);
		}
	},
};

module.exports = projectController;