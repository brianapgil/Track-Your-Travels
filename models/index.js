const Entry = require('./entry');
const User_db = require('./user_db');

User_db.hasMany(Entry, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Entry.belongsTo(User_db, {
  foreignKey: 'user_id'
});

module.exports = { User_db, Entry };