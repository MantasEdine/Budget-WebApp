const Expense = require("../models/expensesModels");
const mongoose = require("mongoose");

const get_all_expenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: "No expenses found" });
    }
    return res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error in get_all_expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const get_one_expense = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "No expense found" });
    }
    return res.status(200).json({ expense });
  } catch (error) {
    console.error("Error in get_one_expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const delete_one_expense = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "No expense found" });
    }
    return res.status(200).json({ expense: deletedExpense });
  } catch (error) {
    console.error("Error in delete_one_expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const add_one_expense = async (req, res) => {
  const expense = req.body.budgetId;
  try {
    if (!expense || !expense.name || !expense.amount) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });
    }

    const newExpense = new Expense(expense);
    const savedExpense = await newExpense.save();

    return res.status(200).json({ expense: savedExpense });
  } catch (error) {
    console.error("Error in add_one_expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  get_all_expenses,
  get_one_expense,
  delete_one_expense,
  add_one_expense,
};
