import { Router } from "express";
import transporter from "../services/transporter.js";

const router = Router();

router.post("/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject,
      html: `
      <div style="
          padding: 10px 70px;
          text-transform: capitalize;
          background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
          overflow: hidden;
      ">
        
        <h1 style="
            font-size: 2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 32px;
            text-align: center;
        ">${subject}</h1>
        
          <div style="
            margin-bottom: 32px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
            border-radius: 12px;
            padding: 32px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
          ">
              <span style="
                display: block;
                font-size: 1.1rem;
                    font-weight: 500;
                    color: white;
                    margin-bottom: 16px;
                ">From: ${name}</span>
                <span style="
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: white;
                    margin-bottom: 16px;
                ">Email: ${email}</span>

                <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 16px;">
                    ${message}
                </p>
        </div>
    </div>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email send successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
