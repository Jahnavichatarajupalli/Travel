const bookingSchema = require("./bookingschema");
const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookings: [bookingSchema] // store bookings inside user
});
module.exports = mongoose.model("User", userSchema);