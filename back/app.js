const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const clientRouter = require("./routes/ClientRoutes");

require("dotenv").config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/clients", clientRouter);
app.get("/", (req, res) => {
  res.send("welcome to the clients api...");
});

//configure mongoose
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

// server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
