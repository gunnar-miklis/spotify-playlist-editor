'use client';

import type { Metadata } from 'next';
import Link from 'next/link';

import styles from '@/src/styles/app.module.css';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <main className={styles.main}>
      <Link className={styles.link} href='/'>
        Return to Home
      </Link>
      <h1 className={styles.h1}>Oops, there was an error.</h1>
      <p className={styles.p}>{error.message}</p>
      <button className={styles.button} onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}

export const metadata: Metadata = { title: 'Error' };
