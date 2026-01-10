import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookSearchByCategory = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Get unique categories from books
  const categories = [...new Set(books.map(book => book.bookTitle).filter(Boolean))];

  const filteredBooks = selectedCategory
    ? books.filter(book =>
        book.bookTitle?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : books;

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="px-6 py-10 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Resources </h1>

      <div className="flex justify-center mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-80 text-gray-700"
        >
          <option value="">-- Select a Category --</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              onClick={() => handleBookClick(book._id)}
              className="cursor-pointer bg-white p-4 rounded shadow-md flex flex-col items-center hover:shadow-lg transition-all"
            >
              <img
                src={book.imageURL}
                alt={book.bookTitle}
                className="w-40 h-52 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-center">{book.bookTitle}</h2>
              <p className="text-sm text-gray-600 mt-1">{book.category}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No books found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookSearchByCategory;
