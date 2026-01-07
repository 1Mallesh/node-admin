import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Admin API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  // ✅ FIXED PATH (IMPORTANT)
  apis: [path.join(__dirname, "../routes/*.ts")],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
