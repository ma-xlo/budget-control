import express from 'express';
import { createUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.delete('/users/:id', deleteUser)
router.get('/users', (req, res) => {
  res.status(200).json({message: "ok"})
});

export default router;