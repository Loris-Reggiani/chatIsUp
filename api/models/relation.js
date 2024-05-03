// models/relation.js
const User = require('./User');
const Team = require('./Team');
const ChatMessage = require('./ChatMessage');
const Mission = require('./Mission');
// Define the many-to-many relationship with the alias 'members'
User.belongsToMany(Team, { through: 'UserTeams', as: 'teams' });
Team.belongsToMany(User, { through: 'UserTeams', as: 'members' });

// Define associations here
ChatMessage.belongsTo(Team, { foreignKey: 'TeamId', as: 'team' });
Team.hasMany(ChatMessage, { foreignKey: 'TeamId' });

Team.hasMany(Mission);
Mission.belongsTo(Team);

User.hasMany(Mission);
Mission.belongsTo(User, { foreignKey: 'UserId' }); // Ensure correct foreign key if needed
