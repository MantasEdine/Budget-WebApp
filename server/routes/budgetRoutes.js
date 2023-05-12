const express = require("express");

const budgetControllers = require("../controllers/budgetControllers.js");
const router = express.Router();
router.get("/", budgetControllers.get_all_budgets);
router.get("/:id", budgetControllers.get_one_budget);
router.delete("/:id", budgetControllers.delete_one_budget);
router.post("/", budgetControllers.add_one_budget);
router.get("/:budgetId/expenses", budgetControllers.getAllExpenses_forBudget);
router.get(
  "/:budgetId/expenses/:id",
  budgetControllers.getOneExpenses_forBudget
);
router.post("/:budgetId/expenses", budgetControllers.creatExpenseForBudget);
module.exports = router;
