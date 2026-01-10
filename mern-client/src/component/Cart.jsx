import React, { useEffect, useState } from "react";
import cartimg from "../assets/emptyCard.jpg"
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((book) => book._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="px-4 lg:px-24 py-10">
      <h2 className="text-4xl font-bold mb-6 text-center mt-16"> your Favourite</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg"><img src={cartimg}></img></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((book) => (
            <div key={book._id} className="border rounded-xl p-4 shadow-lg relative">
              <img
                src={book.imageURL}
                alt={book.bookTitle}
                className="h-48 w-full object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-4">{book.bookTitle}</h3>
              <p className="text-gray-600 mt-2">{book.bookDescription.slice(0, 100)}...</p>
              <button
                onClick={() => handleRemove(book._id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-all duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;