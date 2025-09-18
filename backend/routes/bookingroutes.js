const express = require("express");
const User = require("../schema/userschema"); // adjust path if needed
const authMiddleware = require("../middleware/authmiddleware"); // verify JWT
const router = express.Router();

// 📍 Create a new booking (only if logged in)
router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { destinationId,destinationName, date, persons, price } = req.body;
    console.log(destinationId)

    if (!destinationId||!destinationName || !date || !persons || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find logged-in user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add booking to user's bookings array
    const newBooking = {destinationId,destinationName, date, persons, price };
    user.bookings.push(newBooking);

    await user.save();

    res.status(201).json({ message: "Booking confirmed!", booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📍 Get all bookings of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("bookings");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📍 Get a single booking by ID
router.get("/:bookingId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const booking = user.bookings.id(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📍 Cancel (delete) a booking
router.delete("/:bookingId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const booking = user.bookings.id(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.remove(); // remove from subdocument
    await user.save();

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
