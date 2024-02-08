const {sequelize} = require("./databaseConnection");
const a = require('../model/projectModel')(sequelize);
const b = require('../model/taskModel')(sequelize);

a.hasMany(b);
b.belongsTo(a);