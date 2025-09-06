// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import cors from "cors"; // ✅ Import cors

// dotenv.config();
// const app = express();

// app.use(express.json());

// // ✅ Enable CORS for frontend
// app.use(cors({
//   origin: "http://localhost:5173", // your frontend URL
//   methods: ["GET", "POST"]
// }));

// // ✅ Route mounting
// app.use("/api/bookings", bookingRoutes);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// const PORT = process.env.PORT || 5001;
// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// });
import express from "express";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from "cors"; // ✅ Import cors

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST"],
  })
);

// ✅ Route mounting
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;

// 🚀 Run server without MongoDB
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
