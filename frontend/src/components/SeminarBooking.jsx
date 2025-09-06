import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  Wifi,
  Volume2,
  Presentation,
  Mic,
  Loader,
} from "lucide-react";

/** -----------------------------
 *  Helpers
 *  ----------------------------*/
const addDaysISO = (d) => {
  const dt = new Date();
  dt.setDate(dt.getDate() + d);
  return dt.toISOString().split("T")[0];
};

const mins = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const getFeatureIcon = (feature) => {
  switch (feature) {
    case "WiFi":
      return <Wifi size={16} />;
    case "Sound System":
      return <Volume2 size={16} />;
    case "Projector":
      return <Presentation size={16} />;
    case "Microphone":
      return <Mic size={16} />;
    default:
      return null;
  }
};

/** -----------------------------
 *  BASE HALLS DATA
 *  (IMPORTANT: use full names; backend stores/queries by this exact string)
 *  ----------------------------*/
const BASE_HALLS = [
   { name: "Homi J. Bhabha Hall (Electronics & Instrumentation Engineering)", capacity: 200, rating: 4.9, key: "conference" },
  { name: "Vivekananda Hall (Mechanical Engineering)", capacity: 150, rating: 4.8, key: "auditorium" },
  { name: "Mahatma Gandhi Hall (Electrical & Electronics Engineering)", capacity: 120, rating: 4.7, key: "seminar" },
  { name: "A. P. J. Abdul Kalam Hall (Civil Engineering)", capacity: 300, rating: 4.9, key: "keynote" },
  { name: "S. Chandrasekhar Hall (Electronics & Communication Engineering)", capacity: 100, rating: 4.6, key: "lecture" },
  { name: "S. Ramanujan Hall (Information Technology)", capacity: 180, rating: 4.8, key: "presentation" },
  { name: "M. S. Swaminathan Hall (Chemical Engineering)", capacity: 250, rating: 4.7, key: "stage" },
  { name: "Vikram Sarabhai Hall (Textile Technology)", capacity: 160, rating: 4.8, key: "hall" },
  { name: "Jagadish Chandra Bose Hall (Computer Science & Engineering)", capacity: 140, rating: 4.6, key: "event" },
  { name: "Satyendra Nath Bose Hall (computer science Engineering)", capacity: 220, rating: 4.9, key: "auditorium" },
  { name: "Kalpana Chawla Hall (Mechanical Engineering)", capacity: 130, rating: 4.7, key: "conference" },
  { name: "Sunita Williams Hall (Civil Engineering)", capacity: 190, rating: 4.8, key: "seminar" },
];

const unsplash = (q) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&h=500&q=70`;

const IMG_SETS = [
   [
    "photo-1587825140708-dfaf72ae4b04",
    "photo-1503428593586-e225b39bddfe",
    "photo-1520607162513-77705c0f0d4a",
    "photo-1500530855697-b586d89ba3ee",
    "photo-1557800636-894a64c1696f",
  ],
  [
    "photo-1517048676732-d65bc937f952",
    "photo-1517048676732-d65bc937f952",
    "photo-1556761175-4b46a572b786",
    "photo-1551836022-d5d88e9218df",
    "photo-1521737604893-d14cc237f11d",
  ],
  [
    "photo-1505373877841-8d25f7d46678",
    "photo-1557800636-7e3c1f17f5a3",
    "photo-1496307042754-b4aa456c4a2d",
    "photo-1504384308090-c894fdcc538d",
    "photo-1492724441997-5dc865305da7",
  ],
  [
    "photo-1540575467063-178a50c2df87",
    "photo-1523580846011-d3a5bc25702b",
    "photo-1528605248644-14dd04022da1",
    "photo-1515165562835-c4c4e2da6b4f",
    "photo-1544717305-2782549b5136",
  ],
  [
    "photo-1475721027785-f74eccf877e2",
    "photo-1504384764586-bb4cdc1707b0",
    "photo-1473445361085-b9a07f55608b",
    "photo-1473093295043-cdd812d0e601",
    "photo-1485827404703-89b55fcc595e",
  ],
  [
    "photo-1497366216548-37526070297c",
    "photo-1496307042754-b4aa456c4a2d",
    "photo-1515165562835-c4c4e2da6b4f",
    "photo-1500534314209-a25ddb2bd429",
    "photo-1487014679447-9f8336841d58",
  ],
  [
    "photo-1511578314322-379afb476865",
    "photo-1523580846011-d3a5bc25702b",
    "photo-1492724441997-5dc865305da7",
    "photo-1499951360447-b19be8fe80f5",
    "photo-1504384308090-c894fdcc538d",
  ],
  [
    "photo-1591115765373-5207764f72e7",
    "photo-1503424886309-3109e018b68f",
    "photo-1518770660439-4636190af475",
    "photo-1519337265831-281ec6cc8514",
    "photo-1582719478250-c89cae4dc85b",
  ],
  [
    "photo-1574168611461-6f0979d8f0a8",
    "photo-1463107971871-fbac9ddb920f",
    "photo-1485217988980-11786ced9454",
    "photo-1496307042754-b4aa456c4a2d",
    "photo-1504384308090-c894fdcc538d",
  ],
  [
    "photo-1576013551627-0cc20b96c2a7",
    "photo-1504384308090-c894fdcc538d",
    "photo-1520607162513-77705c0f0d4a",
    "photo-1487014679447-9f8336841d58",
    "photo-1475721027785-f74eccf877e2",
  ],
  [
    "photo-1558618666-fcd25c85cd64",
    "photo-1503428593586-e225b39bddfe",
    "photo-1557800636-894a64c1696f",
    "photo-1492724441997-5dc865305da7",
    "photo-1500530855697-b586d89ba3ee",
  ],
  [
    "photo-1582555172866-f73bb12a2ab3",
    "photo-1518770660439-4636190af475",
    "photo-1500534314209-a25ddb2bd429",
    "photo-1463107971871-fbac9ddb920f",
    "photo-1503424886309-3109e018b68f",
  ],
];

const getHallImages = (idx) =>
  IMG_SETS[idx % IMG_SETS.length].map((id) => unsplash(id));

const mkHalls = () =>
  BASE_HALLS.map((hall, idx) => ({
    // id is used only for client rendering; backend uses the NAME
    id: hall.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: hall.name, // <-- send this to backend
    capacity: hall.capacity,
    rating: hall.rating,
    images: getHallImages(idx),
    features: [
      "AC",
      "Projector",
      idx % 2 ? "WiFi" : "Sound System",
      idx % 3 ? "Microphone" : "Stage",
    ],
    key: hall.key,
  }));

/** -----------------------------
 *  API BASE URL
 *  ----------------------------*/
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

/** -----------------------------
 *  HallCard
 *  ----------------------------*/
const HallCard = ({
  hall,
  selected,
  status, // 'booked' | 'available' | 'unknown'
  onSelect,
  slideIndex,
  setSlideIndex,
}) => {
  const current = slideIndex[hall.id] ?? 0;
  const total = hall.images.length;
  const goto = (n) =>
    setSlideIndex((p) => ({ ...p, [hall.id]: (n + total) % total }));

  const badge =
    status === "booked"
      ? { cls: "bg-red-500", text: "Not Available" }
      : status === "unknown"
      ? { cls: "bg-gray-500", text: "Select Date & Time" }
      : { cls: "bg-green-500", text: "Available" };

  return (
    <div
      className={`min-w-[350px] max-w-[350px] snap-start transition-all duration-300 hover:transform hover:-translate-y-2 ${
        status === "booked" ? "opacity-60" : ""
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all ${
          selected
            ? "border-blue-500 shadow-xl ring-4 ring-blue-100"
            : "border-gray-200 hover:border-blue-300 hover:shadow-xl"
        }`}
      >
        {/* Image Slider */}
        <div className="relative h-48 overflow-hidden group">
          <img
            src={hall.images[current]}
            alt={`${hall.name} ${current + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Controls */}
          <button
            type="button"
            onClick={() => goto(current - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full shadow hover:bg-white"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => goto(current + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full shadow hover:bg-white"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {hall.images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goto(i)}
                className={`w-2.5 h-2.5 rounded-full ${
                  i === current ? "bg-white" : "bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`${badge.cls} text-white px-3 py-1 rounded-full text-xs font-medium`}
            >
              {badge.text}
            </span>
          </div>

          {/* Selected icon */}
          <div className="absolute top-3 right-3">
            {selected ? (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="text-white" size={16} />
              </div>
            ) : (
              <div className="w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center">
                <MapPin className="text-gray-700" size={16} />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-bold text-gray-900">{hall.name}</h4>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span className="text-sm font-semibold">{hall.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Users className="text-gray-400" size={16} />
            <span className="text-gray-600">
              Capacity:{" "}
              <span className="font-semibold text-gray-900">
                {hall.capacity}
              </span>
            </span>
          </div>

          {/* Select/Unselect */}
          <button
            type="button"
            onClick={onSelect}
            disabled={status === "booked"}
            className={`w-full py-2.5 rounded-xl font-semibold transition-all ${
              selected
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                : status === "booked"
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {selected ? "Unselect" : "Select This Hall"}
          </button>
        </div>
      </div>
    </div>
  );
};

/** -----------------------------
 *  Main Component
 *  ----------------------------*/
const SeminarBooking = () => {
  const halls = useMemo(() => mkHalls(), []);
  const scrollerRef = useRef(null);

  // IMPORTANT: form.hall holds the **full hall name** (backend schema)
  const [form, setForm] = useState({
    name: "",
    dept: "", 
    eventName: "",
    hall: "", // full hall name
    date: "",
    startTime: "",
    endTime: "",
    email: "",
  });

  // UI selected hall id for styling (separate from form.hall for backend correctness)
  const [selectedHallId, setSelectedHallId] = useState("");

  const [errors, setErrors] = useState({});
  const [otpPhase, setOtpPhase] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [slideIndex, setSlideIndex] = useState({});
  const [message, setMessage] = useState("");

  // Backend state
  // availabilityMap: { [hallName]: true|false } for current date+time window
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // Date constraints
  const minBookDate = addDaysISO(2);

  /** -----------------------------
   *  Availability fetch (per hall)
   *  Expects backend route: POST /bookings/availability
   *  Body: { hall, date, startTime, endTime }
   *  Returns: { available: boolean }
   *  ----------------------------*/
  const fetchAvailabilityForAllHalls = async () => {
    // Need date & times to compute availability
    if (!form.date || !form.startTime || !form.endTime) {
      setAvailabilityMap({});
      return;
    }

    setLoadingAvailability(true);
    try {
      const requests = halls.map(async (h) => {
        const res = await fetch(`${API_BASE_URL}/bookings/availability`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hall: h.name, // send full name to match backend
            date: form.date,
            startTime: form.startTime,
            endTime: form.endTime,
          }),
        });
        const data = await res.json();
        return [h.name, !!data.available];
      });

      const pairs = await Promise.all(requests);
      const next = Object.fromEntries(pairs);
      setAvailabilityMap(next);
    } catch (err) {
      console.error("Availability error:", err);
      setMessage("Failed to load hall availability");
      setAvailabilityMap({});
    } finally {
      setLoadingAvailability(false);
    }
  };

  // Trigger availability checks whenever date/time change
  useEffect(() => {
    fetchAvailabilityForAllHalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.date, form.startTime, form.endTime]);

  // Determine hall status based on availabilityMap
  const statusForHall = (hallName) => {
    if (!form.date || !form.startTime || !form.endTime) return "unknown";
    const available = availabilityMap[hallName];
    if (available === undefined) return "unknown";
    return available ? "available" : "booked";
  };

  // Utility to update form fields and reset errors/messages
  const setField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
    setMessage("");
  };

  // Validation before submit
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!/^[a-z]+\.\d{2}[a-z]{3}@kongu\.edu$/.test(form.email.trim())) {
  e.email = "Enter valid Kongu email (e.g., xyz.23eie@kongu.edu)";
}

    if (!form.dept.trim()) e.dept = "Department is required";
    if (!form.eventName.trim()) e.eventName = "Event name is required";
    if (!form.date) e.date = "Date is required";
    if (form.date && form.date < minBookDate)
      e.date = "Book at least 48 hours in advance";
    if (!form.startTime) e.startTime = "Start time is required";
    if (!form.endTime) e.endTime = "End time is required";

    const st = mins(form.startTime || "0:00");
    const et = mins(form.endTime || "0:00");
    if (form.startTime && form.endTime && st >= et)
      e.endTime = "End time must be after start";

    if (!form.hall) {
      e.hall = "Select a hall";
    } else {
      const status = statusForHall(form.hall);
      if (status === "booked")
        e.hall = "This hall is not available for the selected time.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submit → create booking (sends OTP)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // form.hall is the hall **name** (backend expects this)
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpPhase(true);
        setMessage("OTP sent to your email. Please verify.");
      } else {
        // e.g. { message: "Hall not available at this time" }
        setMessage(data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP (backend expects only { otp })
  const confirmOtp = async (e) => {
    e.preventDefault();
    if (!otpInput.trim()) {
      setErrors((p) => ({ ...p, otp: "Please enter OTP" }));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp: otpInput.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setMessage("Booking confirmed successfully!");
      } else {
        setErrors((p) => ({
          ...p,
          otp: data.message || "OTP verification failed",
        }));
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setErrors((p) => ({ ...p, otp: "Error connecting to server" }));
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setForm({
      name: "",
      eventName: "",
      hall: "",
      date: "",
      startTime: "",
      endTime: "",
      email: "",
    });
    setSelectedHallId("");
    setErrors({});
    setOtpPhase(false);
    setOtpInput("");
    setIsSubmitted(false);
    setMessage("");
    setAvailabilityMap({});
  };

  const scrollBy = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  /** -----------------------------
   *  Success Screen
   *  ----------------------------*/
  if (isSubmitted) {
    const hall = halls.find((h) => h.name === form.hall);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 mb-8">
              Your seminar hall has been successfully booked. You'll receive a
              confirmation email shortly.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Booking Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="font-semibold">
                      {new Date(form.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Hall</div>
                    <div className="font-semibold">{hall?.name}</div>
                  </div>
                </div>
                

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Organizer</div>
                    <div className="font-semibold">{form.name}</div>
                  </div>
                </div>
<div className="flex items-center gap-3">
  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
    <Users size={20} className="text-indigo-600" />
  </div>
  <div>
    <div className="text-sm text-gray-500">Department</div>
    <div className="font-semibold">{form.dept}</div>
  </div>
</div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Phone size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Contact</div>
                    <div className="font-semibold">{form.email}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="p-4 bg-white rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Event</div>
                  <div className="font-semibold text-lg">{form.eventName}</div>
                </div>
                <div className="p-4 bg-white rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Timing</div>
                  <div className="font-semibold">
                    {form.startTime} – {form.endTime}
                  </div>
                </div>
              </div>
            </div>

            <button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              onClick={resetAll}
            >
              Book Another Hall
            </button>
          </div>
        </div>
      </div>
    );
  }

  /** -----------------------------
   *  Main UI
   *  ----------------------------*/
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Book Your Perfect Venue
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-2">
            Premium seminar halls for your events
          </p>
          <p className="text-blue-200">
            Choose from our collection of well-equipped, modern seminar halls
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading availability indicator */}
        {loadingAvailability && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <Loader className="animate-spin text-blue-600" size={20} />
              <span className="text-blue-800">Loading hall availability...</span>
            </div>
          </div>
        )}

        {/* Info/Error message */}
        {message && !otpPhase && !isSubmitted && (
          <div
            className={`border rounded-xl p-4 mb-6 text-center ${
              message.toLowerCase().includes("error") ||
              message.toLowerCase().includes("fail")
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle size={20} />
              <span>{message}</span>
            </div>
          </div>
        )}

        {/* Halls scroller */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Choose Your Hall
              </h3>
              <p className="text-gray-600">
                Browse through our premium seminar halls
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
                type="button"
              >
                <ChevronLeft size={20} className="text-blue-600" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
                type="button"
              >
                <ChevronRight size={20} className="text-blue-600" />
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {halls.map((hall) => {
              const selected = selectedHallId === hall.id;
              const status = statusForHall(hall.name);
              return (
                <HallCard
                  key={hall.id}
                  hall={hall}
                  selected={selected}
                  status={status}
                  onSelect={() => {
                    if (status === "booked") return;
                    // Update UI selected id
                    const nextId = selected ? "" : hall.id;
                    setSelectedHallId(nextId);
                    // Update backend field with FULL HALL NAME or clear
                    setField("hall", selected ? "" : hall.name);
                  }}
                  slideIndex={slideIndex}
                  setSlideIndex={setSlideIndex}
                />
              );
            })}
          </div>
        </div>

        {/* Details + Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-6 order-2 lg:order-1"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Booking Details
            </h3>

            {/* Organizer Info */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="your college mail id"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Department
  </label>
  <input
    type="text"
    name="dept"
    value={form.dept}
    onChange={(e) => setField("dept", e.target.value)}
    placeholder="Enter your department"
    className={`w-full border rounded-lg px-3 py-2 ${
      errors.dept ? "border-red-500" : "border-gray-300"
    }`}
  />
  {errors.dept && <p className="text-red-500 text-sm">{errors.dept}</p>}
</div>

            {/* Event Info */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  value={form.eventName}
                  onChange={(e) => setField("eventName", e.target.value)}
                  placeholder="Enter event title"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.eventName
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.eventName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.eventName}
                  </p>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="sm:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setField("date", e.target.value)}
                  min={minBookDate}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.date
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 48 hours advance booking required
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setField("startTime", e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.startTime
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startTime}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setField("endTime", e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.endTime
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>

            {/* Selected Hall */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Selected Hall *
              </label>
              <div
                className={`px-4 py-3 border-2 rounded-xl ${
                  errors.hall ? "border-red-500" : "border-gray-300"
                } ${form.hall ? "bg-blue-50 border-blue-200" : "bg-gray-50"}`}
              >
                {form.hall ? (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {form.hall}
                    </span>
                    <Check className="text-blue-600" size={18} />
                  </div>
                ) : (
                  <span className="text-gray-500">
                    Select a hall from above
                  </span>
                )}
              </div>
              {errors.hall && (
                <p className="text-red-500 text-sm mt-1">{errors.hall}</p>
              )}

              {/* Live hint */}
              {form.hall && form.date && form.startTime && form.endTime && (
                (() => {
                  const status = statusForHall(form.hall);
                  if (status === "booked")
                    return (
                      <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                        This hall is not available for the selected time.
                      </div>
                    );
                  if (status === "available")
                    return (
                      <div className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                        Great! Your time window is available.
                      </div>
                    );
                  return null;
                })()
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={
                loading ||
                !form.hall ||
                !form.date ||
                !form.name ||
                !form.email ||
                !form.eventName ||
                !form.startTime ||
                !form.endTime
              }
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                "Book Now & Verify"
              )}
            </button>
          </form>

          {/* College Info / Facilities */}
          <div className="bg-white rounded-2xl shadow-xl p-6 order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              College Seminar Facilities
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              <li className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
                High-speed Wi-Fi
              </li>
              <li className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
                4K Projectors & Screens
              </li>
              <li className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
                Professional PA System
              </li>
              <li className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
                Podium & Wireless Mics
              </li>
              <li className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
                Air-conditioned Halls
              </li>
              <li className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
                On-site Tech Support
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Guidelines
            </h4>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-6">
              <li>Bookings must be made at least 48 hours in advance.</li>
              <li>Stick to your booked time window. Grace period: 10 minutes.</li>
              <li>Food & drinks only in designated areas. Keep the hall clean.</li>
              <li>Any additional equipment must be declared during booking.</li>
            </ol>

            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Contact
            </h4>
            <div className="text-gray-700 space-y-1">
              <p>Seminar Office: +91 98765 43210</p>
              <p>Email: seminars@yourcollege.edu</p>
              <p>Hours: Mon–Sat, 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {otpPhase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Verify Your Email
              </h3>
              <p className="text-gray-600">
                We've sent a 6-digit code to <br />
                <span className="font-semibold text-gray-900">
                  {form.email}
                </span>
              </p>
            </div>

            <form onSubmit={confirmOtp} className="space-y-6">
              <div>
                <input
                  inputMode="numeric"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) =>
                    setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className={`w-full px-6 py-4 text-center text-2xl font-bold border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors tracking-widest ${
                    errors.otp ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="000000"
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {errors.otp}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={18} />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Complete"
                  )}
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setOtpPhase(false);
                    setOtpInput("");
                    setErrors((prev) => ({ ...prev, otp: "" }));
                    setMessage("");
                  }}
                  className="px-6 py-4 rounded-xl border-2 border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeminarBooking;
