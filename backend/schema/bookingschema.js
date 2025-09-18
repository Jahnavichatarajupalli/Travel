const mongoose=require('mongoose')
const bookingSchema = new mongoose.Schema({
  destinationId: { type: Number },
  destinationName: { type: String, required: true },
  date: { type: Date, required: true },
  persons: { type: Number, required: true },
  price:{type:Number,required:true},
  status: { type: String, default: "Confirmed" }
});
module.exports = bookingSchema; 