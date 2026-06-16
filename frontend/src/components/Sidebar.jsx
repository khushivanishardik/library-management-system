import {
  FaBook,
  FaHome,
  FaPlus,
  FaHistory,
  FaSignOutAlt,
  FaUserGraduate,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        📚 LibraryHub
      </div>

      <nav>

        <Link to="/dashboard">
          <FaHome />
          Dashboard
        </Link>

        <Link to="/books">
          <FaBook />
          Books
        </Link>

        {user?.role === "manager" && (
          <Link to="/add-book">
            <FaPlus />
            Add Book
          </Link>
        )}

        {user?.role === "student" && (
          <Link to="/my-books">
            <FaUserGraduate />
            My Books
          </Link>
        )}

        <Link to="/history">
          <FaHistory />
          History
        </Link>

      </nav>

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
};

export default Sidebar;