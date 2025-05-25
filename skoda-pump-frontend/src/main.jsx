import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import "./index.css";

// Animations
const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

// Landing Page
function LandingPage() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fade}
      className="min-h-screen bg-gradient-to-br from-green-900 via-lime-800 to-green-700 flex items-center justify-center p-8"
    >
      <div className="bg-white/5 border border-green-900 rounded-2xl shadow-2xl backdrop-blur-md p-10 max-w-3xl w-full text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-lime-300 drop-shadow-lg">
          Skoda Pump Selector
        </h1>
        <p className="mt-4 text-lg md:text-xl text-lime-100">
          Get the most efficient pump suggestions tailored to your needs.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/app")}
          className="mt-8 px-6 py-3 bg-lime-500 hover:bg-lime-400 text-green-900 font-bold rounded-lg shadow-md transition-all duration-300"
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
}

// App Page
function AppPage() {
  const [formData, setFormData] = useState({
    flow_rate: "",
    pressure: "",
    fluid_type: "",
  });

  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuggestion("");

    try {
      const res = await fetch("http://localhost:8000/suggest-pump", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to fetch suggestion");
      const data = await res.json();
      setSuggestion(data.suggestion);
    } catch (error) {
      console.error(error);
      setSuggestion("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fade}
      className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white font-sans p-8"
    >
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-wider">Skoda Pump Selector</h1>
        <button className="bg-white text-green-900 font-semibold px-5 py-2 rounded shadow hover:bg-green-200 transition">
          Logout
        </button>
      </header>

      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Select Your Pump Criteria</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label htmlFor="flow_rate" className="block mb-2 text-sm font-medium">Flow Rate (L/min)</label>
            <input
              id="flow_rate"
              type="number"
              name="flow_rate"
              placeholder="e.g. 150"
              value={formData.flow_rate}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white/20 border border-green-300 text-white placeholder-green-200 hover:border-white focus:ring focus:ring-lime-300/40"
            />
          </div>

          <div>
            <label htmlFor="pressure" className="block mb-2 text-sm font-medium">Pressure (bar)</label>
            <input
              id="pressure"
              type="number"
              name="pressure"
              placeholder="e.g. 5"
              value={formData.pressure}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white/20 border border-green-300 text-white placeholder-green-200 hover:border-white focus:ring focus:ring-lime-300/40"
            />
          </div>

          <div>
            <label htmlFor="fluid_type" className="block mb-2 text-sm font-medium">Pump Type</label>
            <select
              id="fluid_type"
              name="fluid_type"
              value={formData.fluid_type}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white/20 border border-green-300 text-white hover:border-white focus:ring focus:ring-lime-300/40"
            >
              <option value="" className="bg-green-900 text-white">-- Select Type --</option>
              <option value="Submersible" className="bg-green-900 text-white">Submersible</option>
              <option value="Centrifugal" className="bg-green-900 text-white">Centrifugal</option>
              <option value="Diaphragm" className="bg-green-900 text-white">Diaphragm</option>
            </select>
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-800 font-bold px-6 py-3 rounded-full shadow hover:bg-green-200 transition"
            >
              {loading ? "Loading..." : "Find Best Pump"}
            </motion.button>
          </div>
        </form>

        {suggestion && (
          <div className="mt-8 p-4 bg-white/10 border border-lime-400 rounded text-lime-100">
            <strong>Suggested Pump:</strong>
            <p className="mt-2 whitespace-pre-line">{suggestion}</p>
          </div>
        )}
      </motion.section>
    </motion.div>
  );
}

// Main Router
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
