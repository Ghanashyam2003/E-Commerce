import { MapPin } from "lucide-react";
import React from "react";
import { FaCaretDown } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom"; // ✅ import NavLink here

function Navbar() {
  const location = false;

  return (
    <div className="bg-white py-3.5 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo and Location */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">Z</span>aptro
            </h1>
          </Link>
          <div className="flex gap-1 cursor-pointer text-gray-700 items-center">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? <div></div> : "Add Address"}
            </span>
            <FaCaretDown />
          </div>
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
          <Link to={"/cart"} className="relative ">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-4 -right-4  text-white ">
              0
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
