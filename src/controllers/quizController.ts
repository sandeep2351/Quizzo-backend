import { Request, Response } from "express";
import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * User Login
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: rows[0].id, username }, JWT_SECRET, { expiresIn: "1h" });

    return res.json({ success: true, token, user: rows[0] });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * User Signup
 */
export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (rows.length > 0) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);

    return res.status(201).json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * Get All Quizzes
 */
export const getQuizzes = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const { rows } = await pool.query("SELECT * FROM quizzes");
    return res.json(rows);
  } catch (error) {
    console.error("Get Quizzes Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * Create a Quiz
 */
export const createQuiz = async (req: Request, res: Response): Promise<Response> => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: "Title and description are required" });
  }

  try {
    await pool.query("INSERT INTO quizzes (title, description) VALUES ($1, $2)", [title, description]);
    return res.status(201).json({ success: true, message: "Quiz created successfully!" });
  } catch (error) {
    console.error("Create Quiz Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * Update a Quiz
 */
export const updateQuiz = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: "Title and description are required" });
  }

  try {
    const { rowCount } = await pool.query("UPDATE quizzes SET title = $1, description = $2 WHERE id = $3", [
      title,
      description,
      id,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    return res.json({ success: true, message: "Quiz updated successfully" });
  } catch (error) {
    console.error("Update Quiz Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * Delete a Quiz
 */
export const deleteQuiz = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query("DELETE FROM quizzes WHERE id = $1", [id]);

    if (rowCount === 0) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    return res.json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Delete Quiz Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};
