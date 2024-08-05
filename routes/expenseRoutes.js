import express from 'express';
import { 
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
  getExpense,
  getTotalByCategory,
  getTotalByUser,
  getTotalByPaymentDate
} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/expenses/', createExpense);
router.get('/expenses/', getAllExpenses);
router.delete('/expenses/:id/', deleteExpense);
router.put('/expenses/:id/', updateExpense);
router.get('/expenses/:id/', getExpense);
router.get('/expenses/total/categories/', getTotalByCategory);
router.get('/expenses/total/users/', getTotalByUser);
router.get('/expenses/total/paymentdate/', getTotalByPaymentDate);

export default router;