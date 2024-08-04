const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Entry extends Model {}

// Initialize the Entry model
Entry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Ensures that the format is 'latitude, longitude'
        is: {
          args: /^-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?$/,
          msg: 'Location must be in the format "latitude, longitude"'
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user_db', // References the user_db model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'entry',
  }
);

module.exports = Entry;