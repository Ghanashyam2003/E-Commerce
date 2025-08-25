import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div
      className="group relative rounded-2xl bg-white/70 border border-gray-200 
                 shadow-lg hover:shadow-2xl hover:-translate-y-2 
                 transition-all duration-300 cursor-pointer backdrop-blur-lg p-4"
    >
      {/* Discount Badge */}
      {product.discountPercentage > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}

      {/* Product Image */}
      <div
        className="overflow-hidden rounded-xl bg-gray-100"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.thumbnail}
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
        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>

        {/* Price & Rating */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-800">${product.price}</p>
          <span className="text-yellow-500 font-semibold text-sm">
            ⭐ {product.rating}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="mt-4 flex items-center justify-center gap-2 w-full 
                   bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2.5 rounded-xl 
                   hover:from-red-600 hover:to-red-700 active:scale-95 transition-all duration-200 shadow-md"
      >
        <IoCartOutline className="w-5 h-5" /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
