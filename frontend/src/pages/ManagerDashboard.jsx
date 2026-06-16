import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../components/DashboardLayout";

import {
  getManagerStats,
} from "../services/bookService";

const ManagerDashboard = () => {

  const [stats, setStats] =
    useState({
      totalBooks: 0,
      borrowedBooks: 0,
      students: 0,
    });

  useEffect(() => {

    const loadStats =
      async () => {
        try {

          const data =
            await getManagerStats();

          setStats(data);

        } catch (error) {
          console.log(error);
        }
      };

    loadStats();

  }, []);

  return (
    <DashboardLayout>

      <h1>
        📚 Manager Dashboard
      </h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Books</h3>
          <span>
            {stats.totalBooks}
          </span>
        </div>

        <div className="stat-card">
          <h3>Borrowed Books</h3>
          <span>
            {stats.borrowedBooks}
          </span>
        </div>

        <div className="stat-card">
          <h3>Students</h3>
          <span>
            {stats.students}
          </span>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default ManagerDashboard;