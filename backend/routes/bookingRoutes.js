import express from "express";
import { createBooking, verifyBooking, checkAvailability } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);
router.post("/verify", verifyBooking);
router.post("/availability", checkAvailability);

export default router;
