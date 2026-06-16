import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import ManagerRoute from "../components/ManagerRoute";

import MyBooks from "../pages/MyBooks";
import BorrowHistory from "../pages/BorrowHistory";

import Books from "../pages/Books.jsx";
import AddBook from "../pages/AddBook";

import ProtectedRoute from "../components/ProtectedRoute";




const AppRoutes = () => {
  return (
    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-book"
        element={
          <ManagerRoute>
            <AddBook />
          </ManagerRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <BorrowHistory />
          </ProtectedRoute>
        }
      />

      <Route
  path="/my-books"
  element={
    <ProtectedRoute>
      <MyBooks />
    </ProtectedRoute>
  }
/>

      {/* Unknown Routes */}
      <Route
        path="*"
        element={<Navigate to="/login" />}
      />

    </Routes>
  );
};

export default AppRoutes;