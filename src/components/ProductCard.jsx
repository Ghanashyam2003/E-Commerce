import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div
      className="group relative rounded-2xl bg-white/80 border border-gray-200 
                 shadow-md hover:shadow-2xl hover:-translate-y-2 
                 transition-all duration-300 cursor-pointer backdrop-blur-md p-4"
    >
      {/* Product Image */}
      <div
        className="overflow-hidden rounded-xl bg-gray-100"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h1
          className="text-gray-900 font-semibold text-lg line-clamp-2 
                     group-hover:text-red-500 transition-colors duration-300"
        >
          {product.title}
        </h1>
        <p className="mt-2 text-xl font-bold text-gray-800">${product.price}</p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="mt-4 flex items-center justify-center gap-2 w-full 
                   bg-red-500 text-white font-semibold py-2.5 rounded-xl 
                   hover:bg-red-600 active:scale-95 transition-all duration-200"
      >
        <IoCartOutline className="w-5 h-5" /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
