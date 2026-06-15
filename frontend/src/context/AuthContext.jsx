import {
  createContext,
  useState,
  useEffect,
} from "react";

import { getProfile } from "../services/authService";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const data =
          await getProfile();

        setUser(data);
      } catch  {
        localStorage.removeItem(
          "token"
        );
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};