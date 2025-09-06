// import Booking from "../models/Booking.js";
// import { sendOTP, sendConfirmation } from "../services/emailService.js";
// import { addBookingToSheet } from "../services/googleSheet.js"; // ✅ import Google Sheet util

// // Generate OTP
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// // Check hall availability
// const isHallAvailable = async (hall, date, startTime, endTime) => {
//   const bookings = await Booking.find({ hall, date, status: "confirmed" });
//   return bookings.every(
//     (b) => endTime <= b.startTime || startTime >= b.endTime
//   );
// };

// // Create booking
// export const createBooking = async (req, res) => {
//   try {
//     const { name, dept, eventName, hall, date, startTime, endTime, email } = req.body;

//     const available = await isHallAvailable(hall, date, startTime, endTime);
//     if (!available) {
//       return res.status(400).json({ message: "Hall not available at this time" });
//     }

//     const otp = generateOTP();
//     const booking = await Booking.create({
//       name,
//       dept,
//       eventName,
//       hall,
//       date,
//       startTime,
//       endTime,
//       email,
//       otp,
//       status: "pending",
//     });

//     await sendOTP(email, otp);
//     res.json({ message: "Booking created. OTP sent to email.", bookingId: booking._id });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating booking", error: error.message });
//   }
// };

// // Verify OTP and confirm booking
// export const verifyBooking = async (req, res) => {
//   try {
//     const { otp } = req.body;

//     // Find booking with the given OTP and pending status
//     const booking = await Booking.findOne({ otp, status: "pending" });
//     if (!booking) {
//       return res.status(404).json({ message: "Invalid OTP or booking already confirmed" });
//     }

//     // Confirm the booking
//     booking.status = "confirmed";
//     booking.otp = null;
//     await booking.save();

//     // Send confirmation email
//     await sendConfirmation(booking.email, booking);

//     // ✅ Add confirmed booking to Google Sheets
//     await addBookingToSheet(booking);

//     res.json({ message: "Booking confirmed. Confirmation email sent.", booking });
//   } catch (error) {
//     res.status(500).json({ message: "Error verifying booking", error: error.message });
//   }
// };

// // Check hall availability (for frontend use)
// export const checkAvailability = async (req, res) => {
//   try {
//     const { hall, date, startTime, endTime } = req.body;
//     const available = await isHallAvailable(hall, date, startTime, endTime);
//     res.json({ available });
//   } catch (error) {
//     res.status(500).json({ message: "Error checking availability", error: error.message });
//   }
// };

import { sendOTP, sendConfirmation } from "../services/emailService.js";
import { addBookingToSheet } from "../services/googleSheet.js";
import validateBooking from "../middlewares/validateBooking.js"; // ✅ use Google Sheets validator

// Store pending bookings in memory (for OTP verification)
const pendingBookings = new Map();

// Generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { name, dept, eventName, hall, date, startTime, endTime, email } =
      req.body;

    // ✅ Check availability from Google Sheets
    const available = await validateBooking(hall, date, startTime, endTime);
    if (!available) {
      return res
        .status(400)
        .json({ message: "Hall not available at this time" });
    }

    const otp = generateOTP();

    // Temporarily store booking in memory until OTP is verified
    const bookingId = Date.now().toString(); // simple unique ID
    const booking = {
      _id: bookingId,
      name,
      dept,
      eventName,
      hall,
      date,
      startTime,
      endTime,
      email,
      otp,
      status: "pending",
    };
    pendingBookings.set(otp, booking);

    // Send OTP email
    await sendOTP(email, otp);

    res.json({ message: "Booking created. OTP sent to email.", bookingId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

// Verify OTP and confirm booking
export const verifyBooking = async (req, res) => {
  try {
    const { otp } = req.body;

    const booking = pendingBookings.get(otp);
    if (!booking || booking.status !== "pending") {
      return res.status(404).json({
        message: "Invalid OTP or booking already confirmed",
      });
    }

    // Confirm the booking
    booking.status = "confirmed";
    booking.otp = null;

    // Remove from pending list
    pendingBookings.delete(otp);

    // Send confirmation email
    await sendConfirmation(booking.email, booking);

    // ✅ Add confirmed booking to Google Sheets
    await addBookingToSheet(booking);

    res.json({
      message: "Booking confirmed. Confirmation email sent.",
      booking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying booking", error: error.message });
  }
};

// Check hall availability (for frontend use)
export const checkAvailability = async (req, res) => {
  try {
    const { hall, date, startTime, endTime } = req.body;

    // ✅ Uses Google Sheets validator
    const available = await validateBooking(hall, date, startTime, endTime);

    res.json({ available });
  } catch (error) {
    res.status(500).json({
      message: "Error checking availability",
      error: error.message,
    });
  }
};
