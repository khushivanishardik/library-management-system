import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const data =
        await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
  "user",
  JSON.stringify(data)
);

      setUser(data);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-left">
          <h1>📚 LibraryHub</h1>

          <p>
            Manage books, track
            borrowing history,
            and explore your
            digital library with
            a modern experience.
          </p>
        </div>

        <div className="auth-right">

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <h2>Welcome Back</h2>

            <p>
              Login to continue
            </p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <button type="submit">
              Login
            </button>

            <div className="auth-link">
              Don't have an account?
              {" "}
              <Link to="/register">
                Register
              </Link>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;