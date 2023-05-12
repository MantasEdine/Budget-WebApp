const Budget = require("../models/budgetModels");
const mongoose = require("mongoose");
const Expenses = require("../models/expensesModels");
const get_all_budgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    if (!budgets || budgets.length === 0) {
      return res.status(404).json({ message: "No budgets found" });
    }
    return res.status(200).json({ budgets });
  } catch (error) {
    console.error("Error in get_all_budgets:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const get_one_budget = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid budget ID" });
    }
    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: "No budget found" });
    }
    return res.status(200).json({ budget });
  } catch (error) {
    console.error("Error in get_one_budget:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const delete_one_budget = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid budget ID" });
    }
    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return res.status(404).json({ message: "No budget found" });
    }
    return res.status(200).json({ budget: deletedBudget });
  } catch (error) {
    console.error("Error in delete_one_budget:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const add_one_budget = async (req, res) => {
  const budget = req.body;
  try {
    if (!budget || !budget.name || !budget.amount) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields" });
    }

    const newBudget = new Budget(budget);
    const savedBudget = await newBudget.save();

    return res.status(200).json({ budget: savedBudget });
  } catch (error) {
    console.error("Error in add_one_budget:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getAllExpenses_forBudget = async (req, res) => {
  try {
    const budgetExpense = await Budget.find();
    res.status(200).json({ budget: budgetExpense });
  } catch (error) {
    console.error("Error in getting_budgetExpense:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getOneExpenses_forBudget = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid budget ID" });
  }
  try {
    const OnebudgetExpense = await Budget.findOne(id);
    res.status(200).json({ OnebudgetExpense });
  } catch (error) {
    console.error("Error in getting_budgetExpense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const creatExpenseForBudget = async (req, res) => {
  const { budgetId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(budgetId)) {
    return res.status(400).json({ message: "Invalid budget ID" });
  }
  try {
    const budgetExpense = req.body;
    const newBudgetExpense = new Expenses(budgetExpense);
    const savedNewBudgetExpense = await newBudgetExpense.save();
    return res.status(200).json({ message: savedNewBudgetExpense });
  } catch (error) {
    console.error("Error in creatingBudgetExpense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  get_all_budgets,
  get_one_budget,
  delete_one_budget,
  add_one_budget,
  creatExpenseForBudget,
  getOneExpenses_forBudget,
  getAllExpenses_forBudget,
};
