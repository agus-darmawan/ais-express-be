import express from "express";
import connectDB from "./config/db.config.js";
import { config } from "./config/env.config.js";
import cors from "cors";
import corsOptions from "./config/cors.config.js";
import {
  aisRoutes,
  shipTypeRoutes,
  vesselRoutes,
  fuelRoutes,
  zvalueRoutes,
  fpCiiRoutes,
} from "./routes/index.js";
import { logger } from "./config/logger.config.js";
import { connectSocket } from "./config/ws.config.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

connectDB();
connectSocket();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json());

app.use("/api/v1", aisRoutes);
app.use("/api/v1", shipTypeRoutes);
app.use("/api/v1", vesselRoutes);
app.use("/api/v1", fuelRoutes);
app.use("/api/v1", zvalueRoutes);
app.use("/api/v1", fpCiiRoutes);

app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/cii", (req, res) => {
  res.render("cii");
});

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});

export default (req, res) => {
  app(req, res);
};
