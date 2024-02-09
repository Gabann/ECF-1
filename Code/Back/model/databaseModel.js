const {DataTypes} = require("sequelize");

const defineModel = (sequelize, name, attributes) => {
	return sequelize.define(name, attributes);
};

module.exports = (sequelize) => {
	const Project = defineModel(sequelize, "Project", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		projectName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		projectDescription: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});

	const Task = defineModel(sequelize, "Task", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		taskName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		taskDescription: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		taskPriority: {
			type: DataTypes.ENUM('Low', 'Medium', 'High'),
			allowNull: false,
		},
		isDone: {
			type: DataTypes.BOOLEAN,
		},
	});

	const User = defineModel(sequelize, "User", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Project.hasMany(Task);
	Task.belongsTo(Project);

	User.belongsToMany(Project, {through: 'User_projects'});
	Project.belongsToMany(User, {through: 'User_projects'});

	return {Project, Task, User};
};