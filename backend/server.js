require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use("/api/auth", authRoutes);

// app.listen(5000, () => console.log("Server running on port 5000"));

if (require.main === module) {
    app.listen(5000, () => console.log("Server running on port 5000"));
  }
  
  module.exports = app;
