const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    verificationToken: {
      type: String,
      default: null
    },

    verificationTokenExpiresAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;