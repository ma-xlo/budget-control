import sequelize from './config/database.js';
import User from './models/user.js'; // Import your models

// Sync all models to the database
sequelize.sync({ force: true }) // Use `force: true` to drop and recreate tables
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create database tables:', err);
  });