import express, { Request, Response } from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes"; 

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173",credentials:true }));
app.use(express.json());

app.use("/api", quizRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.get("/:id", (req: Request, res: Response) => {
    res.send(`Hello, ID: ${req.params.id}`);
});

app.post("/", (req: Request, res: Response) => {
    res.json({ data: req.body });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
