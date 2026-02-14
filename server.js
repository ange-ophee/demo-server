// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

connectDB();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

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
      {
        url: process.env.API_URL || 'https://demo-server-production-395f.up.railway.app/',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat:'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// --- Routes ---
app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);

//Health check endpoint
app.get('/', (_req, res) => {
  res.send('Server is running 🚀');
});

// --- Start server ---
const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });