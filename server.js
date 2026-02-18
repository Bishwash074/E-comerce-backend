const express = require('express')
const cors = require('cors')
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoute")
const seedAdmin= require("./config/seedAdmin");
require("dotenv").config();

const app = express()

app.use(express.json())

connectDB().then(() => {
  seedAdmin()
});


app.use("/api/auth", authRoutes)
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});