import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/me", getMe);
router.get("/users/:id/", getUser);
router.put("/users/:id/", updateUser);
router.delete("/users/:id/", deleteUser);

export default router;
