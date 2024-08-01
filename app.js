import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
app.use("/api", categoryRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Link: http://localhost:3000/");
});
