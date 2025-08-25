import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Info */}
        <div>
          <Link to="/">
            <h1 className="text-red-500 text-3xl font-bold tracking-wide">
              Zaptro
            </h1>
          </Link>
          <p className="mt-3 text-sm leading-relaxed">
            Powering Your World with the Best in Electronics.
          </p>
          <p className="mt-3 text-sm">123 Electronics St, Style City, NY 10001</p>
          <p className="text-sm">Email: support@Zaptro.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/contact"
                className="hover:text-red-500 transition duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/shipping"
                className="hover:text-red-500 transition duration-300"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="hover:text-red-500 transition duration-300"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/tracking"
                className="hover:text-red-500 transition duration-300"
              >
                Order Tracking
              </Link>
            </li>
            <li>
              <Link
                to="/size-guide"
                className="hover:text-red-500 transition duration-300"
              >
                Size Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-5 text-2xl">
            <FaFacebook className="hover:text-blue-500 cursor-pointer transition duration-300" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition duration-300" />
            <FaTwitterSquare className="hover:text-sky-400 cursor-pointer transition duration-300" />
            <FaPinterest className="hover:text-red-600 cursor-pointer transition duration-300" />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay in the Loop
          </h3>
          <p className="text-sm mb-4">
            Subscribe for special offers, free giveaways, and updates.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-5 rounded-r-md transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500 font-semibold">Zaptro</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
