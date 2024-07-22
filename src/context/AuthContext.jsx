import Loading from "@/pages/Loading";
import React, { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// Create context
const AuthContext = createContext();

//Create custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

//Create auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setTimeout(() => {
      if (token) {
        fetchUserInfo(token);
      } else {
        setLoading(false);
      }
    }, 1000);
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("http://localhost:3030/api/profile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        console.error("Failed to fetch user info:", response.statusText);
        logout(); // Ensure logout on failed fetch
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      logout(); // Ensure logout on error
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem("jwt", token);
    setLoading(true);
    await fetchUserInfo(token);
    setLoading(false);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setUser(null); // Reset user state on logout
    navigate("/login");
  };

  if (loading) {
    return <Loading />; // Display a loading indicator
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
