const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const testJwtRouter = require("./controllers/test-jwt");
const authRouter = require("./controllers/auth");
const usersRouter = require("./controllers/users");
const verifyToken = require("./middleware/verify-token");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes go here
app.use("/test-jwt", testJwtRouter);
app.use("/auth", authRouter);
app.use("/users", verifyToken, usersRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
