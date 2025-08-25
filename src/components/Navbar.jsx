import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapPin, Menu, X, ChevronDown } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

/**
 * Props:
 * - initialLocation: optional object { city, county, state, display }
 * - onLocationDetected: optional callback (locationObj) => {}
 * - cartCount: optional number
 */
export default function Navbar({
  initialLocation = null,
  onLocationDetected,
  cartCount = 0,
}) {
  const [location, setLocation] = useState(initialLocation);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [manualInput, setManualInput] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    // close dropdown when clicking outside
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // helper to call parent callback and set state
  const applyLocation = (locObj) => {
    setLocation(locObj);
    if (typeof onLocationDetected === "function") onLocationDetected(locObj);
  };

  // detect current location via Geolocation + reverse-geocode
  const detectLocation = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("Geolocation not supported by this browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          const res = await axios.get(url);
          const addr = res?.data?.address || {};

          const locObj = {
            city:
              addr.city || addr.town || addr.village || addr.hamlet || addr.county || "",
            county: addr.county || "",
            state: addr.state || addr.region || "",
            display: res?.data?.display_name || "",
          };

          applyLocation(locObj);
          setOpenDropdown(false);
        } catch (err) {
          console.error("Reverse geocode error:", err);
          setError("Unable to get address. Try manual input.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        if (err.code === 1) setError("Permission denied. Allow location access.");
        else if (err.code === 2) setError("Position unavailable.");
        else if (err.code === 3) setError("Location request timed out.");
        else setError("Unknown error getting location.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleManualSet = () => {
    if (!manualInput.trim()) {
      setError("Please type a city or area name.");
      return;
    }
    const locObj = {
      city: manualInput.trim(),
      county: "",
      state: "",
      display: manualInput.trim(),
    };
    applyLocation(locObj);
    setManualInput("");
    setOpenDropdown(false);
  };

  const displayText =
    location?.city || location?.county || location?.state || "Add Address";

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-2xl font-bold text-red-600 hover:scale-105 transition"
            onClick={() => setMobileOpen(false)}
          >
            <span className="font-serif">Z</span>
            <span className="font- text-gray-950" font-size="2xl" >
              aptro
            </span>
          </Link>
        </div>

        {/* Middle: Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-red-600" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "text-red-600" : "")}
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-red-600" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-red-600" : "")}
          >
            Contact
          </NavLink>
        </nav>

        {/* Right: Location + Cart + Auth (desktop) */}
        <div className="flex items-center gap-4">
          {/* Location */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown((s) => !s)}
              className="flex items-center gap-2 px-3 py-2 border rounded-md hover:shadow-sm transition"
              aria-expanded={openDropdown}
              aria-haspopup="dialog"
            >
              <MapPin className="text-red-500" />
              <div className="text-sm text-gray-800">
                <div className="truncate max-w-[140px]">{displayText}</div>
              </div>
              <ChevronDown size={16} />
            </button>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 mt-2 w-[300px] bg-white border rounded-md shadow-lg p-4 animate-slide-in">
                <div className="flex items-start justify-between">
                  <h4 className="text-md font-semibold">Change Location</h4>
                  <button
                    onClick={() => setOpenDropdown(false)}
                    className="text-gray-500 hover:text-red-500  p-1"
                    aria-label="Close"
                  >
                    <CgClose />
                  </button>
                </div>

                <div className="mt-3 space-y-3 ">
                  <button
                    onClick={detectLocation}
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor:pointer"
                  >
                    {loading ? "Detecting..." : "Detect my location"}
                  </button>

                  <div className="text-xs text-gray-500">or</div>

                  <div className="flex gap-2">
                    <input
                      value={manualInput}
                      onChange={(e) => {
                        setManualInput(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Type city or area"
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-300"
                    />
                    <button
                      onClick={handleManualSet}
                      className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
                    >
                      Set
                    </button>
                  </div>

                  {error && <div className="text-sm text-red-500">{error}</div>}

                  {location && (
                    <div className="text-sm text-gray-600 mt-1 break-words">
                      Current:{" "}
                      <span className="font-medium">
                        {location.display || displayText}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative inline-flex items-center p-1">
            <IoCartOutline className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>

          {/* Auth */}
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile burger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-1"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-3">
          <NavLink
            onClick={() => setMobileOpen(false)}
            to="/"
            className="block"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setMobileOpen(false)}
            to="/products"
            className="block"
          >
            Products
          </NavLink>
          <NavLink
            onClick={() => setMobileOpen(false)}
            to="/about"
            className="block"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setMobileOpen(false)}
            to="/contact"
            className="block"
          >
            Contact
          </NavLink>

          {/* Small location control inside mobile menu */}
          <div className="pt-2 border-t">
            <div className="flex gap-2 items-center">
              <button
                onClick={detectLocation}
                disabled={loading}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-md"
              >
                {loading ? "Detecting..." : "Detect my location"}
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Current: {location?.display || displayText}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
