import { login, logout, register } from "@/controllers/auth/auth.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
