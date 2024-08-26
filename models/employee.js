const mongoose = require("mongoose");
const { encrypt, decrypt } = require('./cryptoUtils');

const employeeSchema = new mongoose.Schema({
  fullName:{
    type: String,
    required: true,
  },
  gender: { type: String, enum: ['female', 'male'], required: true },
  mobNo:{
    type: Number,
    required: true,
  },
  role:{
    type: String,
    required: true,
    enum: ['admin', 'manager'],
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: { type: Date, default: Date.now }
});

employeeSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = encrypt(this.password);
  }
  next();
});
employeeSchema.methods.comparePassword = function(candidatePassword) {
  const decryptedPassword = decrypt(this.password);
  return candidatePassword === decryptedPassword;
};


const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;
