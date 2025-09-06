// // services/googleSheets.js
// import { google } from "googleapis";

// const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// // ✅ Setup Google Auth with ENV variables
// const auth = new google.auth.GoogleAuth({
//   credentials: {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//   },
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });

// console.log("Using Service Account:", process.env.GOOGLE_CLIENT_EMAIL);

// const sheets = google.sheets({ version: "v4", auth });
// const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// // Common header row schema
// const HEADERS = [
//   "Booking ID",
//   "Name",
//   "Dept",
//   "Event Name",
//   "Hall",
//   "Date",
//   "Start Time",
//   "End Time",
//   "Email",
//   "Status",
// ];

// // ✅ Ensure tab exists and has headers
// async function ensureTab(tabName) {
//   const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
//   const exists = meta.data.sheets.some(
//     (s) => s.properties.title === tabName
//   );

//   if (!exists) {
//     // Create new sheet
//     await sheets.spreadsheets.batchUpdate({
//       spreadsheetId: SPREADSHEET_ID,
//       requestBody: {
//         requests: [{ addSheet: { properties: { title: tabName } } }],
//       },
//     });

//     // Add headers
//     await sheets.spreadsheets.values.update({
//       spreadsheetId: SPREADSHEET_ID,
//       range: `${tabName}!A1:J1`,
//       valueInputOption: "USER_ENTERED",
//       requestBody: { values: [HEADERS] },
//     });
//   }
// }

// // ✅ Append confirmed booking to correct tab
// export async function addBookingToSheet(booking) {
//   try {
//     if (booking.status !== "confirmed") return;

//     const tabName = booking.hall; // tab must match hall name
//     await ensureTab(tabName);

//     await sheets.spreadsheets.values.append({
//       spreadsheetId: SPREADSHEET_ID,
//       range: `${tabName}!A:J`,
//       valueInputOption: "USER_ENTERED",
//       requestBody: {
//         values: [
//           [
//             booking._id.toString(),
//             booking.name,
//             booking.dept,
//             booking.eventName,
//             booking.hall,
//             booking.date,
//             booking.startTime,
//             booking.endTime,
//             booking.email,
//             booking.status,
//           ],
//         ],
//       },
//     });

//     console.log(`✅ Added booking to Google Sheet tab: ${tabName}`);
//   } catch (err) {
//     console.error("❌ Error adding to Google Sheet:", err.response?.data || err.message);
//   }
// }
// services/googleSheets.js
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// ✅ Setup Google Auth with ENV variables
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: SCOPES,
});

console.log("Using Service Account:", process.env.GOOGLE_CLIENT_EMAIL);

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Common header row schema
const HEADERS = [
  "Booking ID",
  "Name",
  "Dept",
  "Event Name",
  "Hall",
  "Date",
  "Start Time",
  "End Time",
  "Email",
  "Status",
];

// ✅ Ensure tab exists and has headers
async function ensureTab(tabName) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const exists = meta.data.sheets.some(
    (s) => s.properties.title === tabName
  );

  if (!exists) {
    // Create new sheet
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: tabName } } }],
      },
    });

    // Add headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${tabName}!A1:J1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [HEADERS] },
    });
  }
}

// ✅ Append confirmed booking to correct tab
export async function addBookingToSheet(booking) {
  try {
    if (booking.status !== "confirmed") return;

    const tabName = booking.hall; // tab must match hall name
    await ensureTab(tabName);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${tabName}!A:J`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            booking._id.toString(),
            booking.name,
            booking.dept,
            booking.eventName,
            booking.hall,
            booking.date,
            booking.startTime,
            booking.endTime,
            booking.email,
            booking.status,
          ],
        ],
      },
    });

    console.log(`✅ Added booking to Google Sheet tab: ${tabName}`);
  } catch (err) {
    console.error("❌ Error adding to Google Sheet:", err.response?.data || err.message);
  }
}

// ✅ Fetch all bookings from a hall tab
export async function getAllBookings(hall) {
  try {
    await ensureTab(hall); // make sure tab exists
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${hall}!A2:J`, // skip header row
    });

    const rows = response.data.values || [];
    return rows.map((row) => ({
      bookingId: row[0],
      name: row[1],
      dept: row[2],
      eventName: row[3],
      hall: row[4],
      date: row[5],
      startTime: row[6],
      endTime: row[7],
      email: row[8],
      status: row[9],
    }));
  } catch (err) {
    console.error("❌ Error fetching bookings:", err.response?.data || err.message);
    return [];
  }
}
