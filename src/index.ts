import express, { Request, Response } from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes";

const app = express();
const PORT = 5000;

// ✅ FIX: Configure CORS correctly
app.use(
  cors({
    origin: "https://quizzo-xi.vercel.app", // Allow only frontend
    credentials: true, // Allow cookies, authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api", quizRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
