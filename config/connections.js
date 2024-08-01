const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  // Use the DB_URL environment variable if it's defined
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres', 
    logging: false, // Disable logging; set to `console.log` for debugging
  });
} else {
  // Use individual database components from environment variables
  sequelize = new Sequelize(
    process.env.DB_NAME,    // Database name
    process.env.DB_USER,    // Database user
    process.env.DB_PASSWORD, // Database password
    {
      host: 'localhost', 
      dialect: 'postgres', 
      logging: false, // Disable logging; set to `console.log` for debugging
    }
  );
}

module.exports = sequelize;