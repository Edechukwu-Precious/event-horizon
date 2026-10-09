const toPublicUser = (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

module.exports = toPublicUser;