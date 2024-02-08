const {Sequelize} = require("sequelize");
require('dotenv').config();

let sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "mysql"
	}
);

sequelize.sync({force: false})
	.then(() => console.log("La base de données à bien été synchronisée"))
	.catch((error) =>
		console.error("Problème lors de la synchronisation :", error.message)
	);

const Project = require('../model/projectModel')(sequelize);
const Task = require('../model/taskModel')(sequelize);
const User = require('../model/userModel')(sequelize);


User.belongsToMany(Project, {through: 'User assigned to project'});
Project.belongsToMany(User, {through: 'User assigned to project'});

// Project.belongsToMany(Task, {through: 'Test'});
// Task.belongsToMany(Project, {through: 'Test'});

Project.hasMany(Task, {
	foreignKey: 'taskId'
});
Task.belongsTo(Project);

module.exports = {
	sequelize
};
