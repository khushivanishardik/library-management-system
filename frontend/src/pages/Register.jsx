import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  registerUser,
} from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
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
      await registerUser(
        formData
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-left">

          <h1>📖 Join LibraryHub</h1>

          <p>
            Create your account
            and access a modern
            digital library
            platform.
          </p>

        </div>

        <div className="auth-right">

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <h2>Create Account</h2>

            <p>
              Start your journey
            </p>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

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
              Register
            </button>

            <div className="auth-link">
              Already have an account?
              {" "}
              <Link to="/login">
                Login
              </Link>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Register;