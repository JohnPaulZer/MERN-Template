import dotenv from "dotenv";
dotenv.config();
// Libraries
import expressMongoSanitize from "@exortek/express-mongo-sanitize";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
// Database
import initDB from "@/db/db.connect.js";
// Middlewares
import { globalErrorHandler } from "@/middlewares/global-error-handler.middleware";
import { globalRateLimiter } from "@/middlewares/limiter.middleware";
// Routes
import { authRouter } from "@/routes/auth/auth.route";
import { tokenRouter } from "@/routes/token/token.route";

const bootstrap = async () => {
  const app = express();

  const PORT = process.env.PORT || 5000;
  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : [];

  // - local dev: false
  // - production behind 2 proxy: 2
  const isProd = process.env.NODE_ENV === "production";
  app.set("trust proxy", isProd ? 2 : false);

  // CORS
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        // Reject everything else
        callback(new Error("CORS not allowed"), false);
      },
      credentials: true,
    }),
  );

  // Security headers
  app.use(helmet());

  // Rate limiting
  app.use(globalRateLimiter);

  // Logger
  app.use(morgan("dev"));

  // JSON parser
  app.use(express.json());

  // Prevent NoSQL Injection
  app.use(expressMongoSanitize());

  // Cookie parser
  app.use(cookieParser());

  // Test api
  app.get("/api/test", (req, res) => {
    res.status(200).send("Api is running");
  });

  // Routes
  app.use("/api/auth", authRouter);
  app.use("/api/token", tokenRouter);

  // 404 handler: Invalid route
  app.use((req, res) => {
    res.status(404).json({
      message: "Route Not Found",
      path: req.originalUrl,
      method: req.method,
    });
  });

  // Error handler
  app.use(globalErrorHandler);

  const server = http.createServer(app);
  server.setTimeout(300000);

  server.listen(PORT, () => {
    initDB();
    console.log(`Server Running on port ${PORT}`);
  });
};

bootstrap().catch((e) => {
  console.error("Fatal boot error:", e);
  process.exit(1);
});
