const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.models");

const {
  generateVerificationToken,
  hashVerificationToken,
} = require("../helpers/verificationToken");

const { sendVerificationEmail } = require("../helpers/userEmails");

const toPublicUser = require("../helpers/publicUser");

const { JWT_EXPIRATION } = require("../constant");

// =========================
// REGISTER
// =========================

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { token, hashedToken, expiresAt } = generateVerificationToken();

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken: hashedToken,
      verificationTokenExpiresAt: expiresAt,
    });

    await sendVerificationEmail(user, token);

    return res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
      user: toPublicUser(user),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// =========================
// LOGIN
// =========================

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      },
    );

    return res.status(200).json({
      message: "Login successful",
      user: toPublicUser(user),
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// =========================
// VERIFY EMAIL
// =========================

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    if (!token) {
      return res.status(400).json({
        message: "Verification token is required",
      });
    }

    const hashedToken = hashVerificationToken(token);

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpiresAt: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification token",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    user.isVerified = true;

    user.verificationToken = null;

    user.verificationTokenExpiresAt = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
};
