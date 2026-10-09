const crypto = require("crypto");

const generateVerificationToken = () => {
  const token = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const expiresAt = new Date(
    Date.now() + 15 * 60 * 1000
  );

  return {
    token,
    hashedToken,
    expiresAt
  };
};

const hashVerificationToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

module.exports = {
  generateVerificationToken,
  hashVerificationToken
};