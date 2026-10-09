const transporter = require("../configs/mail");

const verificationEmailTemplate = require(
  "../templates/emails/verification"
);

const sendVerificationEmail = async (
  user,
  verificationToken
) => {
  const verificationLink =
    `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  await transporter.sendMail({
    from: `"EventHorizon" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Verify your EventHorizon account",

    html: verificationEmailTemplate(
      user.firstName,
      verificationLink
    )
  });
};

module.exports = {
  sendVerificationEmail
};