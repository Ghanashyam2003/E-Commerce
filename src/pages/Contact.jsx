// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    // Fake delay for animation (like sending message)
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Hide success after 3s
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-white text-center mb-10">
          Get in Touch with <span className="text-red-400">Zaptro</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info Section */}
          <div className="text-white space-y-8">
            <div>
              <h3 className="text-2xl font-semibold">Contact Info</h3>
              <p className="text-gray-300">
                Whether you have a question, feedback, or need technical
                assistance — our team is here to guide you through every step of
                your Zaptro journey.
              </p>
            </div>
            <div className="space-y-3">
              <p><strong>📍 Address:</strong> Zaptro HQ, 123 Innovation Park, Sector 5, Kolkata, India</p>
              <p><strong>📧 Email:</strong> support@zaptro.com</p>
              <p><strong>📞 Phone:</strong> +91 98765 43210</p>
              <p><strong>⏰ Support Hours:</strong> Mon - Sat | 9 AM - 7 PM</p>
            </div>

            {/* FAQ Teaser */}
            <div className="bg-white/10 border border-white/20 p-4 rounded-xl">
              <h4 className="text-lg font-semibold mb-2">💡 Quick Help</h4>
              <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
                <li>Track your order in "My Orders"</li>
                <li>Check our FAQ page</li>
                <li>For urgent support, call our hotline</li>
              </ul>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div>
              <label className="block text-white mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Type your message..."
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-300"
            >
              {status === "loading" ? "Sending..." : "Send Message 🚀"}
            </button>

            {/* Animated Success Message */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center "
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="bg-green-500 w-20 h-20 flex items-center justify-center rounded-full shadow-lg"
                  >
                    <span className="text-4xl">✅</span>
                  </motion.div>
                  <p className="text-white text-lg mt-4 font-semibold">
                    Message Sent Successfully!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thank You Note */}
            <p className="text-center text-sm text-gray-300 mt-4">
              Thank you for reaching out to{" "}
              <span className="text-red-400 font-semibold">Zaptro</span>.  
              We’ll get back to you within 24-48 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
