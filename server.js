require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const preorderRoutes = require("./routes/preorders");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/preorders", preorderRoutes);

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/eliteform";
const port = Number(process.env.PORT) || 3000;

app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.status(200).json({
    ok: true,
    dbConnected: dbState === 1,
    apiVersion: 2,
    supportsDeleteOrder: true,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Mongo connection error:", err.message);
  });
