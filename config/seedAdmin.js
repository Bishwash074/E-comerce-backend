const bcrypt = require("bcryptjs");
const User = require("../modal/userModal");

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ where: { role: "admin" } });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully");

  } catch (error) {
    console.error("Error creating admin:", error.message);
  }
};

module.exports = seedAdmin; // ✅ Export the function directly
