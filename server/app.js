const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config;

//import routes
const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
//create express app
const app = express();

// middlwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/budget", budgetRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/auth", authRoutes);

const db =
  "mongodb+srv://YoucefRabia:IAcjRN0F48NFERkI@cluster0.abwtzgw.mongodb.net/Cluster0?retryWrites=true&w=majority";
const Port = process.env.PORT || 3000;

// connect to the database
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to DATABASE ");
    app.listen(Port);
  })
  .catch((err) => {
    console.log(err.message);
  });
