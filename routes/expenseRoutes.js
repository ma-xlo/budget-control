import express from 'express';
import { 
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
  getExpense
} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/expenses/', createExpense);
router.get('/expenses/', getAllExpenses);
router.delete('/expenses/:id/', deleteExpense);
router.put('/expenses/:id/', updateExpense);
router.get('/expenses/:id/', getExpense);

export default router;