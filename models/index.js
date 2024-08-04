const Entry = require('./entry'); // Import the entry model
const User_db = require('./user_db'); // Import the user_db model

// Allow user to have multiple entries
User_db.hasMany(Entry, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Allow multiple entries to belong to a user
Entry.belongsTo(User_db, {
  foreignKey: 'user_id'
});

module.exports = { User_db, Entry };