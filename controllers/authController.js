const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../modal/userModal')

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if fields are empty
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExisting = await User.findOne({ where: { email } });

    if (userExisting) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: "All fields are reuired" })
    }

    // check if the userExist
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalids email or paswword" })
    }

    const token = jwt.sign({
      id: user.id, role: user.role
    },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    return res.status(200).json({
      message: "User Login sucessuflly",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { registerUser,loginUser };