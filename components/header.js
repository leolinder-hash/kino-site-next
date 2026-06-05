"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const response = await fetch("/api/auth/me");
      const data = await response.json();

      if (response.ok && data.user) {
        setUser(data.user);
      }
    }
    getUser();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    setUser(null);
    window.location.href = "/";
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/kino-logo-v2.png"
          alt="Kino logo"
          width={220}
          height={110}
        />
      </Link>

      <nav className={styles.nav}>
        <Link href="/movies">Våra filmer</Link>
        <Link href="/about">Om oss</Link>
        {user ? (
          <span className={styles.userInfo}>
            <span className={styles.username}>Hej, {user.username}!</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logga ut
            </button>
          </span>
        ) : (
          <Link href="/login" className={styles.loginBtn}>
            Logga in
          </Link>
        )}
      </nav>
    </header>
  )
}