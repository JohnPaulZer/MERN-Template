import { refreshToken } from "@/controllers/token/token.controller";
import { Router } from "express";

export const tokenRouter = Router();

tokenRouter.post("/refresh", refreshToken);
