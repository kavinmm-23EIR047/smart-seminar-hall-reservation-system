import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

// --------------------------------------------------
// Transporter
// --------------------------------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --------------------------------------------------
// Send OTP
// --------------------------------------------------
export const sendOTP = async (to, otp) => {
  await transporter.sendMail({
    from: `"Seminar Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Seminar Hall Booking OTP",
    text: `Your OTP is: ${otp}`,
  });
};

// --------------------------------------------------
// Generate Creative PDF (Booking Confirmation)
// --------------------------------------------------
const generatePDFBuffer = async (booking) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    // ---- Header ----
    doc
      .fontSize(18)
      .fillColor("#0B5ED7")
      .font("Helvetica-Bold")
      .text("KONGU ENGINEERING COLLEGE", { align: "center" });

    doc
      .fontSize(12)
      .fillColor("black")
      .font("Helvetica")
      .text("Perundurai, Erode - 638060, Tamil Nadu, India", { align: "center" })
      .moveDown(1);

    doc
      .fontSize(14)
      .fillColor("#333")
      .font("Helvetica-Bold")
      .text("SEMINAR HALL BOOKING CONFIRMATION", {
        align: "center",
        underline: true,
      })
      .moveDown(2);

    // ---- Booking Details Box ----
    const startX = 50;
    const startY = doc.y;
    const boxWidth = 500;

    doc.rect(startX, startY, boxWidth, 230).stroke("#0B5ED7"); // increased box height

    let textY = startY + 15;

    const detailLine = (label, value) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#0B5ED7")
        .text(label, startX + 15, textY, { continued: true });

      doc
        .font("Helvetica")
        .fillColor("#000")
        .text(` ${value || "—"}`);

      textY += 25;
    };

    detailLine("Name:", booking.name);
    detailLine("Department:", booking.dept); // ✅ Added Dept
    detailLine("Email:", booking.email);
    detailLine("Hall:", booking.hall);
    detailLine("Date:", booking.date);
    detailLine("Time:", `${booking.startTime} - ${booking.endTime}`);
    detailLine("Event:", booking.eventName);

    doc.moveDown(8);

    // ---- Footer ----
    doc
      .fontSize(11)
      .fillColor("gray")
      .text("This is a computer-generated confirmation.", { align: "center" })
      .moveDown(0.3);

    doc
      .fontSize(11)
      .fillColor("gray")
      .text("For queries, please contact the Administration Office.", {
        align: "center",
      });

    doc.end();
  });
};

// --------------------------------------------------
// Send Confirmation Email with PDF attachment
// --------------------------------------------------
export const sendConfirmation = async (to, booking) => {
  const pdfBuffer = await generatePDFBuffer(booking);

  await transporter.sendMail({
    from: `"Seminar Hall Booking | Kongu Engineering College" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ Booking Confirmed - ${booking.hall} on ${booking.date}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background: #0B5ED7; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Kongu Engineering College</h2>
          <p style="margin: 4px 0;">Perundurai, Erode - 638060</p>
          <h3 style="margin: 10px 0;">Seminar Hall Booking Confirmation</h3>
        </div>
        
        <div style="padding: 20px; color: #333;">
          <p>Dear <strong>${booking.name}</strong>,</p>
          <p>Your seminar hall booking has been <span style="color: green; font-weight: bold;">successfully confirmed</span>. Below are your booking details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${booking.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Department</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${booking.dept}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${booking.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Hall</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${booking.hall}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Date</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${booking.date}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Time</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${booking.startTime} - ${booking.endTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Event</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${booking.eventName}</td>
            </tr>
          </table>
          
          <p style="margin-top: 20px; text-align: center; font-weight: bold; color: #0B5ED7;">
            📎 Your official booking bill (PDF) is attached with this email.
          </p>
          
          <p style="margin-top: 20px;">Thank you for booking with <strong>Kongu Engineering College</strong>.</p>
          <p style="margin: 0; font-size: 12px; color: gray;">This is an automated confirmation. Please contact the admin office for queries.</p>
        </div>
        
        <div style="background: #f1f1f1; padding: 12px; text-align: center; font-size: 12px; color: #555;">
          © ${new Date().getFullYear()} Kongu Engineering College, Perundurai, Erode
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `Booking_${booking.hall}_${booking.date}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
};

console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
