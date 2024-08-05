import { validateAuthorization, getMonthName } from '../utils/helpers.js'
import { Op } from 'sequelize';
import Expense from '../models/expense.js';
import Category from '../models/category.js';
import User from '../models/user.js';

export async function createExpense (req, res) {
  const user = validateAuthorization(req.headers.authorization)

  if(!user) {
    return res.status(401).json({message: "Unauthorized"})
  }

  try {
    const payload = req.body
    payload.userId =  user.id
    const expense = await Expense.create(payload);
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export async function getAllExpenses (req, res) {
  const user = validateAuthorization(req.headers.authorization)
  console.log(user)
  if(!user) {
    return res.status(401).json({message: "Unauthorized"})
  }

  try {
    const expenses = await Expense.findAll();
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export async function deleteExpense(req, res){
  const user = validateAuthorization(req.headers.authorization)

  if(!user) {
    return res.status(401).json({message: "Unauthorized"})
  }

  try {
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId);
    if(!expense) {
      return res.status(404).json({message: "Not found"})
    }

    await expense.destroy();
    return res.status(200).json({message: "Deleted Successfully"})

  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export async function updateExpense(req, res){
  const user = validateAuthorization(req.headers.authorization)

  if(!user) {
    return res.status(401).json({message: "Unauthorized"})
  }

  try {
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId);
    
    if(!expense) {
      return res.status(404).json({message: "Not found"})
    }

    await Expense.update(req.body,{where: {id: expenseId}});

    const updatedExpense = await Expense.findByPk(expenseId);
    return res.status(200).json(updatedExpense);
    
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export async function getExpense(req, res){
  const user = validateAuthorization(req.headers.authorization)

  if(!user) {
    return res.status(401).json({message: "Unauthorized"})
  }
  
  try {
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId);
    if(!expense) {
      return res.status(404).json({message: "Not found"})
    }

    return res.status(200).json(expense)

  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export async function getTotalByCategory(req, res) {
  const user = validateAuthorization(req.headers.authorization)

  if(!user) {
    return res.status(401).json({message: "Unauthorized"})
  }

  try {

    const payload = []
    const totalCategories = await Category.findAll()

    for(const category of totalCategories){
      const expenseByCategory = await Expense.findAll({ where: {category: category.id } });
      const totalExpense = expenseByCategory.reduce((accumulator, expense) => {
        return accumulator + expense.value;
      }, 0)
      payload.push({category: category.name, quantity: expenseByCategory.length, total: totalExpense})

    }

    return res.status(200).json(payload)

  } catch (error) {
      return res.status(500).json({error: error.message})
    }
}

export async function getTotalByUser(req, res) {
  const user = validateAuthorization(req.headers.authorization)

  if(!user) {
    return res.status(401).json({message: "Unauthorized"})
  }

  try {

    const payload = []
    const totalUsers = await User.findAll()

    for(const user of totalUsers){
      const expenseByCategory = await Expense.findAll({ where: {category: user.id } });
      const totalExpense = expenseByCategory.reduce((accumulator, expense) => {
        return accumulator + expense.value;
      }, 0)
      payload.push({name: `${user.firstName} ${user.lastName}`, total: totalExpense})

    }

    return res.status(200).json(payload)

  } catch (error) {
      return res.status(500).json({error: error.message})
    }
}

export async function getTotalByPaymentDate(req, res) {
  const user = validateAuthorization(req.headers.authorization)

  if(!user) {
    return res.status(401).json({message: "Unauthorized"})
  }

  try {
    const payload = []
    const expensesByPaymentDate = await Expense.findAll({
      where: {
        paymentDate: {
          [Op.ne]: null
        }
      }
    })

    const expensesByMonth = expensesByPaymentDate.map(expense => {
      const paymentMonth = getMonthName(expense.paymentDate)
      return {month: paymentMonth, value: expense.value}
    })

    const summedData = expensesByMonth.reduce((acc, item) => {
      if (acc[item.month]) {
          acc[item.month].total += item.value;
      } else {
          acc[item.month] = { month: item.month, total: item.value };
      }
      return acc;
    }, {});
  
    const result = Object.values(summedData);

    return res.status(200).json(result)

  } catch (error) {
      return res.status(500).json({error: error.message})
    }
}