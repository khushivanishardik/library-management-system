import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import { getBooks } from "../services/bookService";

import {
  getMyBooks,
  getBorrowHistory,
} from "../services/borrowService";

const StudentDashboard = () => {
  const [availableBooks, setAvailableBooks] =
    useState(0);

  const [myBooks, setMyBooks] =
    useState(0);

  const [history, setHistory] =
    useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const books =
          await getBooks();

        const borrowedBooks =
          await getMyBooks();

        const historyData =
          await getBorrowHistory();

        setAvailableBooks(
          books.length
        );

        setMyBooks(
          borrowedBooks.length
        );

        setHistory(
          historyData.length
        );
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <DashboardLayout>

      <h1>🎓 Student Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Available Books</h3>
          <span>
            {availableBooks}
          </span>
        </div>

        <div className="stat-card">
          <h3>My Borrowed Books</h3>
          <span>
            {myBooks}
          </span>
        </div>

        <div className="stat-card">
          <h3>History</h3>
          <span>
            {history}
          </span>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default StudentDashboard;