import { AppError } from "@/utils/error/app-error.util";
import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isDev = process.env.NODE_ENV === "development";
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong.";
  // Handle AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode; // Custom status code from AppError
    message = err.message; // Custom message from AppError
  }
  // Other error handling logic (e.g., mongoose errors, validation errors, etc.)
  console.error(`[ERROR]: ${err.message}\n${err.stack}`);
  // Send the response with the proper status code and message
  res.status(statusCode).json({
    success: false,
    message,
    ...(isDev && { stack: err.stack }),
  });
};
