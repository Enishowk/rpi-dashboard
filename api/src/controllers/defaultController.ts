import { Request, Response } from "express";
import { generateTokenForUser } from "../utils/jwtUtils";

export const index = (_req: Request, res: Response) => {
  return res.send("Hello World!");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  try {
    return res.json({ token: generateTokenForUser(email) });
  } catch (error) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};
