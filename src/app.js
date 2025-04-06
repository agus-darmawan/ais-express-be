// src/app.js

import express from "express";
import connectDB from "./config/db.config.js";
import { config } from "./config/env.config.js";
import userRoutes from "./routes/userRoutes.js";
import { logger } from "./config/logger.config.js";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});

export default app;
