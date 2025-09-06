// // utils/validateBooking.js
// import Booking from "../models/Booking.js";

// /**
//  * Check hall availability for a given date and time
//  * @param {String} hall - Hall name
//  * @param {String} date - Date in YYYY-MM-DD format
//  * @param {String} startTime - Start time in HH:mm format
//  * @param {String} endTime - End time in HH:mm format
//  * @returns {Boolean} - true if hall is available, false if already booked
//  */
// const validateBooking = async (hall, date, startTime, endTime) => {
//   // Convert time to comparable values
//   const start = parseInt(startTime.replace(":", ""), 10); // e.g., "10:30" → 1030
//   const end = parseInt(endTime.replace(":", ""), 10);

//   // Find bookings for same hall and date
//   const bookings = await Booking.find({ hall, date, status: "confirmed" });

//   for (let b of bookings) {
//     const bookedStart = parseInt(b.startTime.replace(":", ""), 10);
//     const bookedEnd = parseInt(b.endTime.replace(":", ""), 10);

//     // Check overlap condition
//     if (!(end <= bookedStart || start >= bookedEnd)) {
//       return false; // Conflict found
//     }
//   }

//   return true; // No conflicts
// };

// export default validateBooking;
// middleware/validateBooking.js
import { getAllBookings } from "../services/googleSheet.js";

/**
 * Check hall availability for a given date and time using Google Sheets
 * @param {String} hall - Hall name (used as sheet tab name)
 * @param {String} date - Date in YYYY-MM-DD format
 * @param {String} startTime - Start time in HH:mm format
 * @param {String} endTime - End time in HH:mm format
 * @returns {Boolean} - true if hall is available, false if already booked
 */
const validateBooking = async (hall, date, startTime, endTime) => {
  try {
    const start = parseInt(startTime.replace(":", ""), 10);
    const end = parseInt(endTime.replace(":", ""), 10);

    // ✅ Fetch all bookings for this hall
    const bookings = await getAllBookings(hall);

    for (let b of bookings) {
      if (b.date === date && b.status === "confirmed") {
        const bookedStart = parseInt(b.startTime.replace(":", ""), 10);
        const bookedEnd = parseInt(b.endTime.replace(":", ""), 10);

        // Check overlap
        if (!(end <= bookedStart || start >= bookedEnd)) {
          return false; // Conflict found
        }
      }
    }

    return true; // No conflicts
  } catch (err) {
    console.error("❌ Error validating booking:", err.message);
    return false; // Fail-safe: prevent booking if check fails
  }
};

export default validateBooking;
