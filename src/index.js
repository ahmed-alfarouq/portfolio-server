import express from "express";
import cors from "cors";

import emailRoutes from "./routes/emailRoutes.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://ahmed-alfarouq.vercel.app",
    "https://ahmedalfarouq.vercel.app/",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", emailRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
