import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret'; // Use environment variable or default

export async function userAuthentication(req, res) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password, 
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid login' });
    }

    const { id, firstName, lastName, email } = user;
    console.log('User ID:', id);

    const token = jwt.sign({ id, firstName, lastName, email }, SECRET_KEY, {
      expiresIn: 3000000, 
    });

    return res.json({ auth: true, token: token });
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
