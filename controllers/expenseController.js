import Expense from '../models/expense.js'

export async function createExpense (req, res) {
  try {
    const expense = await Expense.create(req.body);
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export async function getAllExpenses (req, res) {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export async function deleteExpense(req, res){
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
  try {
    const expenseId = req.params.id;
    const expense = await Expense.update(req.body,{where: {id: expenseId}});
    return res.status(200).json(expense)

  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export async function getExpense(req, res){
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