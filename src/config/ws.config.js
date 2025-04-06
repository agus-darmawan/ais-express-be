import { io } from "socket.io-client";
import { config } from "./env.config.js";
import { logger } from "./logger.config.js";
import lookup from "socket.io-client";

let parsedData = null;

const connectSocket = () => {
  const socket = io(config.wsUrl, {
    auth: {
      token: config.wsToken,
    },
    transports: ["websocket"],
    withCredentials: true,
  });
  socket.on("connect", () => {
    logger.info(`WebSocket connection established with ID: ${socket.id}`);
  });

  socket.on("messageFromServer", (data) => {
    parsedData = data;
  });

  socket.on("connect_error", (err) => {
    logger.error("Connection error:", err.message || err.stack);
  });

  socket.on("disconnect", () => {
    logger.info("WebSocket connection closed");
  });
};

const getWebSocketData = () => {
  return parsedData;
};

export { connectSocket, getWebSocketData };
