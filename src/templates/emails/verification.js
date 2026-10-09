const verificationEmailTemplate = (firstName, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Verify your EventHorizon account</title>
      </head>

      <body>
        <h2>Welcome to EventHorizon, ${firstName}!</h2>

        <p>
          Thank you for creating an account with EventHorizon.
        </p>

        <p>
          Please click the link below to verify your email address:
        </p>

        <p>
          <a href="${verificationLink}">
            Verify my email
          </a>
        </p>

        <p>
          This verification link will expire in 15 minutes.
        </p>

        <p>
          If you did not create this account, you can ignore this email.
        </p>
      </body>
    </html>
  `;
};

module.exports = verificationEmailTemplate;