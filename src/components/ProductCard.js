import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition transform hover:scale-105">
      {/* Image Container */}
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg font-semibold text-teal-500 mt-4">${product.price}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
