const jwt = require("jsonwebtoken");

const User = require("../models/user.models");

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token required"
      });
    }

    const parts = authHeader.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      return res.status(401).json({
        message: "Invalid authorization format"
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = {
  requireAuth
};