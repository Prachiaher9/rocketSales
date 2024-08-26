
const Employee = require("../models/employee");
const { encrypt } = require('../models/cryptoUtils');
const { generateToken} = require("../jwt");



// // Registration route
exports.registerEmployee = async (req, res) => {
    try {
      const data = {
        fullName:req.body.fullName,
        gender:req.body.gender,
        mobNo:req.body.mobNo,
        role:req.body.role,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      };
      const { email } = data;
      console.log("Received registration data:", data);
  
      const existingemployee = await Employee.findOne({ email });
      if (existingemployee) {
        console.log("Email already exists");
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Encrypt the password before saving
      data.encryptedPassword = encrypt(data.password);
      console.log("Encrypted password:", data.encryptedPassword);
  
      const newemployee = new Employee(data);
      const response = await newemployee.save();
      console.log("Data saved:", response);
  
      const payload = {
        id: response.id,
        email: response.email,
      };
      console.log("JWT payload:", JSON.stringify(payload));
      
      const token = generateToken(payload);
      console.log("Generated token:", token);
  
      res.status(201).json({ response: { ...response.toObject(), password : data.encryptedPassword }, token });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

// // login Route
exports.loginEmployee = async (req, res) => {
    const { username, password } = req.body;
    try {
      const employee = await Employee.findOne({ username });
      if (!employee) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      const isMatch = await employee.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      const token = generateToken({
        id: employee._id,
        username: employee.username,
      });
      res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
      });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ error: "Server error" });
    }
}
