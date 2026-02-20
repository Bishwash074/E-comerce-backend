const jwt = require("jsonwebtoken")
const User = require('../modal/userModal')

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(authHeader)

  if (!authHeader || ! authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  //console.log(token)

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decode.id)
    if (!user) {
      return res.status(401).json({ message: "No acess to user now" });
    }
    req.user = user; // attach user to request
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports={isAuthenticated}