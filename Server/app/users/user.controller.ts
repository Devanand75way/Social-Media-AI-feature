import { Request, Response } from "express";
import { createUser ,login } from "./user.services";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await createUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const loginuser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
}