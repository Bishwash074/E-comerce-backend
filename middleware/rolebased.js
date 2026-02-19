const isAdmin = (req, res, next) => {
  console.log(req.user)
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // Check role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only."
    });
  }

  next();
}


module.exports = { isAdmin };