const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the database connection
require("./db/db");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define the port to use
const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

  // Import routes
const employeeRoutes = require("./routes/employeeRoute");

// Use routes
app.use("/employee",employeeRoutes);