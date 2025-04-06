// src/app.js

import express from "express";
import connectDB from "./config/db.config.js";
import { config } from "./config/env.config.js";
import aisRoutes from "./routes/aisRoutes.js";
import { logger } from "./config/logger.config.js";
import { connectSocket } from "./config/ws.config.js";

const app = express();

connectDB();
connectSocket();

app.use(express.json());

app.use("/api/ais", aisRoutes);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});

export default app;
