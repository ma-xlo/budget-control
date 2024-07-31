import express from 'express';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', (req, res) => {
  res.status(200).json({message: "ok"})
});

export default router;