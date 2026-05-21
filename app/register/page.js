"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSuccessMessage("");

    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage("Registration form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-center">Create account</h1>
        <p className="text-zinc-400 text-center mb-6">
          Register to continue with KINO
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-600 px-4 py-3 outline-none focus:border-white"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-2">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-600 px-4 py-3 outline-none focus:border-white"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-600 px-4 py-3 outline-none focus:border-white"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-white text-black font-semibold py-3 hover:bg-zinc-200 transition"
          >
            Register
          </button>
        </form>

        {successMessage && (
          <p className="text-green-400 text-sm mt-4 text-center">
            {successMessage}
          </p>
        )}

        <p className="text-sm text-zinc-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-white underline">
            Log in here
          </Link>
        </p>
      </div>
    </main>
  );
}