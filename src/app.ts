import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes"; // 👈 index.ts
import { setupSwagger } from "./swagger/swagger";
import logger from "./utils/logger.ts";

dotenv.config();

const app = express();

/* -------------------- Swagger -------------------- */
setupSwagger(app);

/* -------------------- Middlewares -------------------- */
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/* -------------------- Use index.ts for ALL routes -------------------- */
app.use("/api", routes); // ✅ ONLY THIS

app.get("/", (req, res) => {
  res.send("Server is running");
});

/* -------------------- 404 Handler -------------------- */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* -------------------- Server -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  console.log(`🚀 Server running on port ${PORT}`);
});
