import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

const Expense = sequelize.define('Expense', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  responsible: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  paymentDate: {
    type: DataTypes.DATE,
  }
});

export default Expense;