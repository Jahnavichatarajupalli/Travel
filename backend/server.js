const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authroutes");
// const destinationRoutes = require("./routes/destinationRoutes");
const bookingRoutes = require("./routes/bookingroutes");

app.use("/api/auth", authRoutes);
// app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
 
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));