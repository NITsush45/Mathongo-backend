require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
const chapterRoutes = require("./routes/chapterRoutes");
const rateLimiter = require("./middlewares/rateLimiter");

connectDB();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(rateLimiter);

app.use("/api/v1/chapters", chapterRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || "Server Error" });
});

module.exports = app;
