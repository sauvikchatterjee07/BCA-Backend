const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bengal Coding Academy API",
      version: "1.0.0",
      description: "API documentation for Bengal Coding Academy backend",
    },
    servers: [
      {
        url: "http://localhost:5001/api",
        description: "Local dev server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // scan route files for annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
