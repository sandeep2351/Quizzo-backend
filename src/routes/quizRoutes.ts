import express, { Request, Response, NextFunction } from "express";
import {
  login,
  signup,
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz
} from "../controllers/quizController";

const router = express.Router();

// Middleware to handle async errors properly
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

router.post("/login", asyncHandler(login));
router.post("/signup", asyncHandler(signup));
router.get("/quizzes", asyncHandler(getQuizzes));
router.post("/quizzes", asyncHandler(createQuiz));
router.put("/quizzes/:id", asyncHandler(updateQuiz));
router.delete("/quizzes/:id", asyncHandler(deleteQuiz));

export default router;
