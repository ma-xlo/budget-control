import express from 'express';
import { userAuthentication}  from '../controllers/authController.js';

const router = express.Router();

router.post('/auth', userAuthentication);

export default router;