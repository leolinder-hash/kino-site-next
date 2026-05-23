'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        else setGeneralError(data.message || 'Inloggningen misslyckades.');
        return;
      }

      router.push(data.redirectTo || '/');
      router.refresh();
    } catch (err) {
      setGeneralError('Ett nätverksfel uppstod. Försök igen.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Logga in</h1>

      {generalError && <p className={styles.error}>{generalError}</p>}

      <div className={styles.field}>
        <label htmlFor="username">Användarnamn</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        {errors.username && <p className={styles.fieldError}>{errors.username}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Lösenord</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
      </div>

      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? 'Loggar in…' : 'Logga in'}
      </button>
    </form>
  );
}
