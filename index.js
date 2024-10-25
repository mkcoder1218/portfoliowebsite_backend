const express = require("express");
const nodemailer = require('nodemailer')


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "codemk1218@gmail.com",
    pass: "yfok voep otbr mfvs",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/send-email", async (req, res) => {
  const { email, subject, content } = req.body;

  if (!email || !subject || !content) {
    return res
      .status(400)
      .json({ error: "Please provide email, subject, and content" });
  }

  try {
    await transporter.sendMail({
      from: '"Website Contact" <codemk1218@gmail.com>',
      to: "codemk1218@gmail.com",
      subject: subject,
      text: content,
      html: `<p>${content}</p><p>Sender Email: ${email}</p>`,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
