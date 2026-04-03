import nodemailer from "nodemailer";

type TransactionalEmail = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

function getSmtpPort() {
  const parsed = Number(process.env.SMTP_PORT || 587);
  return Number.isNaN(parsed) ? 587 : parsed;
}

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.MAIL_FROM);
}

export async function sendTransactionalEmail({ to, subject, text, html }: TransactionalEmail) {
  if (!isMailConfigured()) {
    throw new Error("Mail delivery is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: getSmtpPort(),
    secure: process.env.SMTP_SECURE === "true" || getSmtpPort() === 465,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS || "",
        }
      : undefined,
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
    html,
  });
}
