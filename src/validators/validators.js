const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
      "any.required": "First name is required"
    }),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters",
      "any.required": "Last name is required"
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    }),

  password: Joi.string()
    .min(8)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain only letters and numbers",
      "string.empty": "Password is required",
      "any.required": "Password is required"
    })
});

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .required()
});

module.exports = {
  registerSchema,
  loginSchema
};