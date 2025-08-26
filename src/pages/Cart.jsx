import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [error, setError] = useState("");

  // ✅ Calculate totals
  const itemsTotal = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = 0;
  const handlingCharge = 5;
  const discount = promoApplied ? 0.1 * itemsTotal : 0; // 10% discount if promo applied
  const grandTotal = itemsTotal + handlingCharge + deliveryCharge - discount;

  // ✅ Promo code validation
  const applyPromo = () => {
    if (promo.trim().toLowerCase() === "zaptro10") {
      setPromoApplied(true);
      setError("");
    } else {
      setError("Invalid promo code ❌");
      setPromoApplied(false);
    }
  };

  // ✅ Checkout validation
  const handleCheckout = () => {
    if (cartItem.length === 0) {
      setError("Your cart is empty. Add items first!");
      return;
    }
    if (!user) {
      setError("Please log in to proceed with checkout.");
      return;
    }
    setError("");
    alert("✅ Order placed successfully!");
    // Here you can integrate Razorpay/Stripe/Backend API
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>

          {/* Cart Items */}
          <div className="mt-10 space-y-5">
            {cartItem.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all p-5 rounded-lg flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-md object-cover border"
                  />
                  <div>
                    <h1 className="md:w-[300px] line-clamp-2 font-semibold">
                      {item.title}
                    </h1>
                    <p className="text-red-500 font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl items-center">
                  <button
                    onClick={() => updateQuantity(cartItem, item.id, "decrease")}
                    className="cursor-pointer px-2 hover:bg-red-600 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(cartItem, item.id, "increase")}
                    className="cursor-pointer px-2 hover:bg-red-600 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Delete Item */}
                <span
                  onClick={() => deleteItem(item.id)}
                  className="hover:bg-red-100 transition-all rounded-full p-3 cursor-pointer"
                >
                  <FaRegTrashAlt className="text-red-500 text-2xl" />
                </span>
              </div>
            ))}
          </div>

          {/* Billing Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 mt-6">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-7 space-y-2">
              <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>
              <div className="flex flex-col space-y-1">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="p-2 rounded-md border"
                  value={user?.fullName || ""}
                  readOnly
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="p-2 rounded-md border"
                  value={location?.county || ""}
                />
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    className="p-2 rounded-md border w-full"
                    value={location?.state || ""}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>PostCode</label>
                  <input
                    type="text"
                    placeholder="Enter your postcode"
                    className="p-2 rounded-md border w-full"
                    value={location?.postcode || ""}
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="Enter your country"
                    className="p-2 rounded-md border w-full"
                    value={location?.country || ""}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>Phone No</label>
                  <input
                    type="text"
                    placeholder="Enter your Number"
                    className="p-2 rounded-md border w-full"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full text-gray-600 my-3">
                <span className="border-b border-gray-400 w-1/4"></span>
                <span className="px-2">OR</span>
                <span className="border-b border-gray-400 w-1/4"></span>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={getLocation}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all"
                >
                  Detect Location
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 space-y-2 h-max">
              <h1 className="text-gray-800 font-bold text-xl">Bill Details</h1>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <LuNotebookText /> Items total
                </h1>
                <p>${itemsTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <MdDeliveryDining /> Delivery Charge
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">$25</span> FREE
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <GiShoppingBag /> Handling Charge
                </h1>
                <p className="text-red-500 font-semibold">${handlingCharge}</p>
              </div>
              {promoApplied && (
                <div className="flex justify-between items-center text-green-600">
                  <h1>Promo Discount</h1>
                  <p>- ${discount.toFixed(2)}</p>
                </div>
              )}
              <hr className="text-gray-200 mt-2" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand Total</h1>
                <p className="font-semibold text-lg">${grandTotal.toFixed(2)}</p>
              </div>

              {/* Promo Code */}
              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                  Apply Promo Code
                </h1>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="p-2 rounded-md border w-full"
                  />
                  <button
                    onClick={applyPromo}
                    className="bg-gradient-to-r from-gray-200 to-gray-300 text-black border px-4 cursor-pointer py-1 rounded-md hover:opacity-80"
                  >
                    Apply
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-1">
                    ✅ Promo applied successfully!
                  </p>
                )}
              </div>

              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3 hover:opacity-90 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-4xl text-center">
            Oh no! Your cart is empty
          </h1>
          <img src={emptyCart} alt="Empty Cart" className="w-[350px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
