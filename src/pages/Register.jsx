import AlertDialog from "@/components/AlertDialog";
import React, { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { ChevronRight, LoaderCircle } from 'lucide-react'


const schema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, {
    message: "Password confirmation must be at least 6 characters",
  }),
});

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false)



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true)
    //Form input validations
    setTimeout(async () => {
      setLoading(false);
      setErrors({});
      setPasswordMatchError(false);

      const result = schema.safeParse(formData);

      if (!result.success) {
        const formattedErrors = result.error.format();
        const errorMessages = {};

        for (const key in formattedErrors) {
          if (formattedErrors[key]?._errors.length) {
            errorMessages[key] = formattedErrors[key]?._errors[0];
          }
        }

        setErrors(errorMessages);
        return;
      }

      // Password match check
      if (formData.password !== formData.confirmPassword) {
        setPasswordMatchError(true);
        return;
      }

      const { confirmPassword, ...dataToSend } = formData;

      //Handle new user request
      try {
        const response = await fetch(
          "http://localhost:3030/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        if (response.ok) {
          setRegistered(true);
        } else {
          setLoginError(true);
          console.error("Register failed");
        }
      } catch (error) {
        setLoginError(true);
        console.error("Register failed", error);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {registered ? (
        <AlertDialog isOpen={true}>
          <div className="">
            <p className="text-2xl mb-6 text-left">
              Congratulations! Your account has been created successfully. You
              can now log in using your email and password.
            </p>
           
              <Link
                className="text-blue-400 underline"
                to={"/login"}
              >
                Go to Log in
              </Link>
        
          </div>
        </AlertDialog>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-5"
        >
          <div>
            <h2 className="text-2xl font-semibold">Create your account</h2>
            <div className="flex gap-1">
              <p className="text-muted-foreground">Already have an account?</p>
              <Link className="text-blue-400 underline" to={"/login"}>
                Sign In
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name:
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name:
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm">{errors.lastname}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password:
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            {passwordMatchError && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
            <div className="py-4">
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {loading? <LoaderCircle className="animate-spin m-auto"/> : "Create Account"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
