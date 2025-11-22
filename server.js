const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const eventRoutes = require("./routes/events");
app.use("/events", eventRoutes);

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
