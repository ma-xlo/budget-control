import express from 'express';
import {getAllCategories, getCategory} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/categories/', getAllCategories);
router.get('/categories/:id/', getCategory);

export default router;