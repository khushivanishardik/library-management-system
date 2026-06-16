import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import useAuth from "../hooks/useAuth";

import { getBooks } from "../services/bookService";
import { borrowBook } from "../services/borrowService";

const Books = () => {
  const { user } = useAuth();

  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleBorrow = async (id) => {
    try {
      await borrowBook(id);

      alert("Book Borrowed Successfully");

      loadBooks();
    } catch (error) {
     console.log(error.response?.data);

alert(
  JSON.stringify(
    error.response?.data
  )
);
    }
  };

  return (
    <DashboardLayout>

      <h1>📚 Books Library</h1>

      <div className="stats-grid">

        {books.map((book) => (

          <div
            key={book._id}
            className="stat-card"
          >
            <h3>{book.title}</h3>

            <p>
              Author: {book.author}
            </p>

            <p>
              Category: {book.category}
            </p>

            <p>
              Available Copies:
              {" "}
              {book.availableCopies}
            </p>

            {user?.role === "student" && (

              <button
                className="borrow-btn"
                onClick={() =>
                  handleBorrow(book._id)
                }
              >
                Borrow Book
              </button>

            )}

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
};

export default Books;