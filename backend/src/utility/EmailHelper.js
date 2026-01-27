import nodemailer from "nodemailer";

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURITY === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOption = {
    from: `MERN Ecommerce <${process.env.EMAIL_USER}>`,
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transport.sendMail(mailOption);
};

export default EmailSend;
