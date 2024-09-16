import nodemailer from "nodemailer";
// const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para enviar un correo electrónico
const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendEmail(email, "2FA Code", `<p>Your 2FA code: ${token}</p>`);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await sendEmail(
    email,
    "Reset your password",
    `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  );
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await sendEmail(
    email,
    "Confirm your email",
    `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  );
};
