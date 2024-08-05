import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret';

export function validateAuthorization(authorizationToken) {

  if(!authorizationToken) {
    return null 
  }

  const token = authorizationToken.split(' ')[1]; // Remove 'Bearer' from the header
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded
}

export function getMonthName(dateString) {
  const date = new Date(dateString);
  const options = { month: 'long' };
  const month = date.toLocaleString('pt-BR', options);
  return `${month[0].toUpperCase()}${month.substring(1)}`
}