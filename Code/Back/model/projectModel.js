const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
	return sequelize.define("Project", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		projectName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		projectDescription: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};