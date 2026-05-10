import Link from "next/link";
import Image from "next/image";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className="{styles.logo}">
        <Image
          src="/kino-logo-v2.png"
          alt="Kino logo"
          width={220}
          height={110}
        />
      </Link>

      <nav className={styles.nav}>
        <Link href="/movies">Alla filmer</Link>
        <Link href="/about">Om oss</Link>
        <Link href="/login" className={styles.loginBtn}>
          Logga in
        </Link>
      </nav>
    </header>
  )
}