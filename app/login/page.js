"use client";

import Link from "next/link";
import styles from "./login.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log in</h1>
        <p className={styles.subtitle}>Welcome back to KINO</p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className={styles.button}>
            Log in
          </button>
        </form>

        <p className={styles.linkText}>
          Don&apos;t have an account? <Link href="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}