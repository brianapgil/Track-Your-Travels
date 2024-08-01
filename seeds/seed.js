const sequelize = require('../config/connections');
const { User_db } = require('../models'); // Adjust the path if necessary

const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User_db.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();