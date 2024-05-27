import nodemailer from "nodemailer";

export async function sendMail({
    to,
    subject,
    body,
  }: {
    to: string;
    subject: string;
    body: string;
  }) {
    const { SMPT_EMAIL, SMTP_USER, SMTP_PASS } = process.env;
    //
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    try {
      const testResult = await transport.verify();
      console.log("Test Result Of Transport", testResult);
    } catch (err) {
      console.log(err);
    }

    try {
      const sendResult = await transport.sendMail({
        from: SMPT_EMAIL,
        to,
        subject,
        html: body,
      });
      console.log({ sendResult });
      return sendResult;
    } catch (err) {
      console.log(err);
    }
  }
