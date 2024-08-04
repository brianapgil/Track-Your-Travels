// Imports Sequelize and loads variables from .env
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Ensures the DB_URL is defined
if (process.env.DB_URL) {
  // Connects to PostgreSQL using the DB_URL
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres', 
    logging: false,
  });
} else {
  // If DB_URL doesn't exist, uses the other .env variables to access the database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      logging: false,
    }
  );
}

module.exports = sequelize;