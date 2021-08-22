import { Request, Response } from "express";
import { generateTokenForUser } from "../utils/jwtUtils";

export const index = (_req: Request, res: Response) => {
  return res.send("Hello World!");
};

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  try {
    return res.json({ token: generateTokenForUser(login) });
  } catch (error) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};
