import request from "supertest";
import { app } from "../../app"; 
import Expense from "../../models/expense";
import User from "../../models/user";
import sequelize from '../../config/database';
import jwt from 'jsonwebtoken';
import { validateAuthorization } from '../../middlewares/authMiddleware.js'

const SECRET_KEY = 'mysecret';


jest.mock('jsonwebtoken', () => ({
    ...jest.requireActual('jsonwebtoken'), 
    verify: jest.fn().mockReturnValue({ id: 1 }),
  }));

beforeAll(async () => {
    await sequelize.sync({ force: true });
});
  
beforeEach(async () => {
    await Expense.destroy({ where: {} }); 
})

describe('DELETE /expenses/:id', () => {
    test('Must delete an expense successfully ', async () => {
     
      const user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        password: 'senha123',
        email: 'john@example.com',
        cpf: '12345678910',
        role: 'user',
      });
  
      const expense = await Expense.create({
        name: 'Internet Bill',
        value: 150.50,
        userId: user.id,
        status: 'pending',
      });
  

      const token = jwt.sign({ id: user.id }, SECRET_KEY);

      const response = await request(app)
        .delete(`/api/expenses/${expense.id}`) 
        .set('Authorization', `Bearer ${token}`) 
        .expect(200); // Espera status 200
  
      
      expect(response.body.message).toBe('Deleted Successfully');
  
     
      const expenseInDb = await Expense.findByPk(expense.id);
      expect(expenseInDb).toBeNull(); 
      user.destroy()
    });
  
    test('Should return 404 if expense not found', async () => {
      const nonExistentExpenseId = 9999; 
  
      const response = await request(app)
        .delete(`/api/expenses/${nonExistentExpenseId}`) 
        .set('Authorization', 'Bearer token') 
        .expect(404); 
  
      
      expect(response.body.message).toBe('Not found');
    });
  
    // test('Should return 401 if authorization fails', async () => {
    //     const user = await User.create({
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         password: 'senha123',
    //         email: 'john@example.com',
    //         cpf: '12345678910',
    //         role: 'user'
    //     });
  
    //     const expense = await Expense.create({
    //         name: 'Electricity Bill 2',
    //         value: 200.00,
    //         userId: user.id,
    //         status: 'pending'
    //     });
  
    //     const token = jwt.sign({ id: user.id }, "INVALID_KEY");

    //     const response = await request(app)
    //       .delete(`/api/expenses/${expense.id}`) 
    //       .set('Authorization', `Bearer ${token}`) 
    //       .expect(401); 
    //     W
    //     expect(response.body.message).toBe('Unauthorized');
    // });
  });


