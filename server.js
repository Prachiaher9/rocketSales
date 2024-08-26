require("dotenv").config();  // Ensure this is at the very top

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the database connection
require("./db/db");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const employeeRoutes = require("./routes/employeeRoute");

// Use routes
app.use("/employee", employeeRoutes);

// Define the port to use
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
