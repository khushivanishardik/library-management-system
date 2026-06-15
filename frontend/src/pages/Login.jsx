import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
} from "../services/authService";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { setUser } =
    useAuth();

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
    <div className="auth-container">
      <form
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>

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
      </form>
    </div>
  );
};

export default Login;