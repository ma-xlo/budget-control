import sequelize from './config/database.js';
import User from './models/user.js'; 
import Expense from './models/expense.js';

sequelize.sync({ force: true }) 
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create database tables:', err);
  });