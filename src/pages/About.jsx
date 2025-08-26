import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center">
          About <span className="text-red-600 font-bold font-serif text-4xl hover:text-amber-700">Z</span>aptro
        </h1>

        {/* Intro */}
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-red-600">Zaptro</span>,
          your one-stop destination for the latest and greatest in electronics.
          From cutting-edge gadgets to must-have accessories, we’re here to
          power up your tech life with premium products, unbeatable service, and
          a passion for innovation.
        </p>

        {/* History */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">Our Story</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Zaptro began in 2015 with a simple idea: make high-quality tech
            accessible to everyone. What started as a small online shop selling
            phone accessories quickly grew into a trusted name in the consumer
            electronics space.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            Over the years, we’ve expanded our catalog from everyday gadgets to
            premium laptops, smart wearables, gaming gear, and home tech
            essentials. Today,{" "}
            <span className="font-medium">
              Zaptro serves thousands of customers across India
            </span>
            , blending affordability with reliability — and we’re only just
            getting started.
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            At Zaptro, our mission is simple:{" "}
            <span className="font-medium">
              to empower people through technology.
            </span>{" "}
            We believe the right gadgets don’t just make life easier — they make
            it more enjoyable, more productive, and more connected. That’s why
            we carefully handpick every product in our store, ensuring a perfect
            balance of innovation, style, and quality.
          </p>
        </div>

        {/* Why Choose */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">
            Why Choose Zaptro?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 leading-relaxed">
            <li>
              Curated electronics from trusted brands and emerging innovators
            </li>
            <li>Lightning-fast and secure nationwide shipping</li>
            <li>Dedicated customer support that genuinely cares</li>
            <li>Hassle-free returns and warranty coverage</li>
            <li>Exclusive deals, seasonal discounts, and member perks</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">Our Vision</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            We envision a future where technology is more than just a tool —
            it’s a companion that enhances everyday life. At Zaptro, we’re
            committed to staying ahead of trends, offering{" "}
            <span className="font-medium">affordable innovation</span> without
            compromise. Our long-term goal is to become{" "}
            <span className="font-medium">
              India’s most trusted tech marketplace
            </span>
            , known not just for products, but for the experiences we create.
          </p>
        </div>

        {/* Closing */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold text-red-600 mb-3">
            Join the Zaptro Family
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Whether you’re a gadget lover, a working professional, or someone
            just looking for smart solutions —{" "}
            <span className="font-medium">Zaptro has something for you.</span>{" "}
            Explore our collections, discover innovations, and be a part of a
            growing community that believes technology should be both exciting
            and accessible.
          </p>
          <Link to={"/products"}>
            <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
