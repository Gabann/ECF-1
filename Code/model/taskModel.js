const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
	return sequelize.define("Task", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		taskName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		taskDescription: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		taskPriority: {
			type: DataTypes.ENUM('Low', 'Medium', 'High'),
			allowNull: false,
		},
	});
};