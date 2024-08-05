import { validateAuthorization, getMonthName } from "../utils/helpers.js";
import { Op } from "sequelize";
import Expense from "../models/expense.js";
import Category from "../models/category.js";
import User from "../models/user.js";

export async function createExpense(req, res) {
  const user = validateAuthorization(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = req.body;
    payload.userId = user.id;
    const expense = await Expense.create(payload);
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getAllExpenses(req, res) {
  const user = validateAuthorization(req.headers.authorization);
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const expenses = await Expense.findAll();
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function deleteExpense(req, res) {
  const user = validateAuthorization(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Not found" });
    }

    await expense.destroy();
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function updateExpense(req, res) {
  const user = validateAuthorization(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Not found" });
    }

    await Expense.update(req.body, { where: { id: expenseId } });

    const updatedExpense = await Expense.findByPk(expenseId);
    return res.status(200).json(updatedExpense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getExpense(req, res) {
  const user = validateAuthorization(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const expenseId = req.params.id;
    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getTotalByCategory(req, res) {
  const user = validateAuthorization(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = [];
    const totalCategories = await Category.findAll();

    for (const category of totalCategories) {
      const expenseByCategory = await Expense.findAll({
        where: { category: category.id },
      });
      const totalExpense = expenseByCategory.reduce((accumulator, expense) => {
        return accumulator + expense.value;
      }, 0);
      payload.push({
        category: category.name,
        quantity: expenseByCategory.length,
        total: totalExpense,
      });
    }

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getTotalByUser(req, res) {
  const user = validateAuthorization(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = [];
    const totalUsers = await User.findAll();

    for (const user of totalUsers) {
      const expenseByUser = await Expense.findAll({
        where: { userId: user.id },
      });
      const totalExpense = expenseByUser.reduce((accumulator, expense) => {
        return accumulator + expense.value;
      }, 0);
      payload.push({
        name: `${user.firstName} ${user.lastName}`,
        quantity: expenseByUser.length,
        total: totalExpense,
      });
    }

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getTotalByPaymentDate(req, res) {
  const user = validateAuthorization(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const expensesByPaymentDate = await Expense.findAll({
      where: {
        paymentDate: {
          [Op.ne]: null,
        },
      },
    });

    const expensesByMonthAndYear = expensesByPaymentDate.map((expense) => {
      const paymentDate = new Date(expense.paymentDate);
      const paymentMonth = getMonthName(paymentDate);
      const paymentYear = paymentDate.getFullYear();
      return { month: paymentMonth, year: paymentYear, value: expense.value };
    });

    const summedData = expensesByMonthAndYear.reduce((acc, item) => {
      const key = `${item.month}-${item.year}`;
      if (acc[key]) {
        acc[key].total += item.value;
        acc[key].quantity += 1;
      } else {
        acc[key] = {
          month: item.month,
          year: item.year,
          quantity: 1,
          total: item.value,
        };
      }
      return acc;
    }, {});

    // Adicionando todos os meses com valor zero se não existirem no resultado
    const allMonths = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const allYears = [
      ...new Set(expensesByMonthAndYear.map((expense) => expense.year)),
    ];

    allYears.forEach((year) => {
      allMonths.forEach((month) => {
        const key = `${month}-${year}`;
        if (!summedData[key]) {
          summedData[key] = {
            month,
            year,
            quantity: 0,
            total: 0,
          };
        }
      });
    });

    const result = Object.values(summedData);

    // Ordenar o resultado por ano e mês
    result.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return allMonths.indexOf(a.month) - allMonths.indexOf(b.month);
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
