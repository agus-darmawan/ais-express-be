import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";
import { logger } from "../config/logger.config.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Token verification failed");
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
