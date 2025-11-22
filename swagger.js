const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EventHub Planner API",
      version: "1.0.0",
      description: "API documentation for EventHub Planner",
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
