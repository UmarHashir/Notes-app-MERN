const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});