const express = require("express");
const router = express.Router();
const expenseControllers = require("../controllers/expensesControllers");
router.get("/", expenseControllers.get_all_expenses);
router.get("/:id", expenseControllers.get_one_expense);
router.delete("/:id", expenseControllers.delete_one_expense);
router.post("/", expenseControllers.add_one_expense);

module.exports = router;
