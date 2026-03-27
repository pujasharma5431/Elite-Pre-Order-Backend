const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const preorderRoutes = require("./routes/preorders");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/preorders", preorderRoutes);
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/preorder.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admin-preorders.html"));
});

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/eliteform";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  })
  .catch((err) => console.error("Mongo connection error:", err));
