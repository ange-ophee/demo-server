// server/server.js
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use("/auth", require("./routes/authRoutes"));
app.use("/student", require("./routes/studentRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

// --- Swagger ---
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DormMate API",
      version: "1.0.0",
      description: "API documentation for DormMate project",
    },
    servers: [
      { url: `https://school-server-production-c017.up.railway.app/` },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// --- 404 handler ---
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.get("/", (_req, res) => {
  res.json({ message: "Server is alive" });
});

// --- Start server ---
const PORT = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs available at /docs`);
    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));