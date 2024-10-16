import { Op } from "sequelize";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

export async function createUser(req, res) {
  const { email, cpf } = req.body;

  const existentUser = await User.findOne({
    where: {
      [Op.or]: [{ cpf: cpf }, { email: email }],
    },
  });

  if (existentUser) {
    return res
      .status(400)
      .json({ message: "Usuário com e-mail ou CPF já cadastrado" });
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getMe(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);

    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json(user);
}

export async function getUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    await User.update(req.body, { where: { id: userId } });

    const updatedUser = await User.findByPk(userId);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    await user.destroy();
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
