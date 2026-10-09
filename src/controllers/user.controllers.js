const toPublicUser = require("../helpers/publicUser");

const getProfile = async (req, res) => {
  return res.status(200).json({
    message: "Profile retrieved successfully",
    user: toPublicUser(req.user)
  });
};

module.exports = {
  getProfile
};