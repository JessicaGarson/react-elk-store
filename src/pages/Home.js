import React, { useState, useEffect } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      return existingProduct
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-6 py-6 flex justify-end">
        <button
          data-testid="cart-button"
          className="relative flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <FaShoppingCart className="mr-2" />
          <span>Cart</span>
        </button>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-left">Elk Store</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 p-6 overflow-auto"
          >
            <h2 className="text-xl font-semibold mb-6">Cart ({cart.length} items)</h2>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} data-testid="cart-item" className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                  </div>
                  <button
                    data-testid="remove-from-cart-button"
                    className="bg-rose-400 text-white px-2 py-1 rounded"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-6">Total: ${totalPrice.toFixed(2)}</h3>
            <button
              className="w-full bg-teal-500 text-white py-2 rounded mt-4 hover:bg-teal-600 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;