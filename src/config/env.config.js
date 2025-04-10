import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  wsUrl: process.env.WS_URL,
  wsToken: process.env.WS_TOKEN,
};
