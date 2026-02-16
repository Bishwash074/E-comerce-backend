const express=require('express')
const cors=require('cors')
const {connectDB}=require("./config/db");
require("dotenv").config();

const app=express()

app.use(express.json())

connectDB();


app.get("/", (req, res) => {
  res.send("E-Commerce API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});