import mongoose from "mongoose";
import { config } from "./env.config.js";
import { logger } from "./logger.config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI);

    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
