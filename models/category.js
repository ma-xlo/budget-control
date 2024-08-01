import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
  }
})

export default Category;