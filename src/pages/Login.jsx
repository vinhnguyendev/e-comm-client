import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const { login, setLoading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(async () => {
      setLoginError(false);
      const response = await fetch("http://localhost:3030/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.token);
      } else {
        setLoginError(true);
        console.error("Login failed");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-5"
      >
        <div>
          <h2 className="text-2xl font-semibold">Log in</h2>
          <p className="text-muted-foreground">
            Welcome back! Please enter your credentials
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <label>Email:</label>
            <input
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="py-2">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Log in
            </Button>
          </div>
          <p className="text-red-400">{loginError ? "Login failed" : null}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-muted-foreground">Don't have an account?</p>
          <Link className="text-blue-400" to={"/register"}>
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}
