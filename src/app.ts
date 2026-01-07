import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import { setupSwagger } from "./swagger/swagger";
import logger from "./utils/logger.ts";




dotenv.config();

const app = express();
setupSwagger(app);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
