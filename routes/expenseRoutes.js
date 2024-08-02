import express from 'express';
import { 
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
  getExpense,
  getExpenseByCategory
} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/expenses/', createExpense);
router.get('/expenses/', getAllExpenses);
router.delete('/expenses/:id/', deleteExpense);
router.put('/expenses/:id/', updateExpense);
router.get('/expenses/:id/', getExpense);
router.get('/expenses/total/categories/', getExpenseByCategory);

export default router;