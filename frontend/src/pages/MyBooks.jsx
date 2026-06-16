import {
  useEffect,
  useState,
} from "react";

import {
  getMyBooks,
  returnBook,
} from "../services/borrowService";

import DashboardLayout from "../components/DashboardLayout";

const MyBooks = () => {
  const [books, setBooks] =
    useState([]);

  const loadBooks =
    async () => {
      try {
        const data =
          await getMyBooks();

        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

useEffect(() => {
  const fetchData = async () => {
    await loadBooks();
  };

  fetchData();
}, []);

  const handleReturn =
    async (id) => {
      try {
        await returnBook(id);

        alert(
          "Book Returned"
        );

        loadBooks();
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
  <DashboardLayout>

    <h1>📖 My Borrowed Books</h1>

    <div className="stats-grid">

      {books.map((item) => (

        <div
          key={item._id}
          className="stat-card"
        >

          <h3>
            {item.book.title}
          </h3>

          <p>
            Author:
            {" "}
            {item.book.author}
          </p>

          <button
            className="return-btn"
            onClick={() =>
              handleReturn(item._id)
            }
          >
            Return Book
          </button>

        </div>

      ))}

    </div>

  </DashboardLayout>
);

};

export default MyBooks;