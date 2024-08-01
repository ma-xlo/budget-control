import express from 'express';
import userRoutes from './routes/userRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', expenseRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('Link: http://localhost:3000/');
});
