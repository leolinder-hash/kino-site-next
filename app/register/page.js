"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./register.module.scss";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSuccessMessage("");
    setServerError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Registration failed");
        return;
      }

      setSuccessMessage("Account created successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Register to continue with KINO</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>

        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {serverError && <p className={styles.error}>{serverError}</p>}

        <p className={styles.linkText}>
          Already have an account? <Link href="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}