import { MapPin } from "lucide-react";
import React, { useState } from "react"; // ✅ added useState
import { FaCaretDown } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg"; // ✅ import missing in your code
import { Link, NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Navbar({ location }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className="bg-white py-3.5 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo and Location */}
        <div className="flex gap-7 items-center relative">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">Z</span>aptro
            </h1>
          </Link>

          <div
            className="flex gap-1 cursor-pointer text-gray-700 items-center"
            onClick={toggleDropdown}
          >
            <MapPin className="text-red-500" />
            <div className="flex flex-col font-semibold">
              {location ? (
                <div className="-space-y-1">
                  <p>{location.county}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </div>
            <FaCaretDown />
          </div>

          {openDropdown && (
            <div className="absolute top-16 left-0 w-[250px] h-max shadow-2xl bg-white border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location{" "}
                <span
                  onClick={toggleDropdown}
                  className="cursor-pointer text-red-500"
                >
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={() => alert("Detecting location...")}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 cursor-pointer"
              >
                Detect my location
              </button>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-gray-700 font-semibold">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-red-500 transition-all"
                    : "text-black"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-red-500 transition-all"
                    : "text-black"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-red-500 transition-all"
                    : "text-black"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-red-500 transition-all"
                    : "text-black"
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-red-500 transition-all"
                    : "text-black"
                }
              >
                Cart
              </NavLink>
            </li>
          </ul>

          {/* Cart Icon */}
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-4 -right-4 text-white">
              0
            </span>
          </Link>

          {/* Auth Section */}
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
