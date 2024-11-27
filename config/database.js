import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL is required
      rejectUnauthorized: false, // Accept self-signed certificates (Neon often requires this)
    },
  },
  logging: false, // Disable SQL logging in production
  schema: 'budget-control'
});

export default sequelize;