import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/src/styles/app.module.css';

export default function Loading() {
  return (
    <main className={styles.main}>
      <Link className={styles.link} href='/'>
        Return to Home
      </Link>
      <h1 className={styles.h1}>Loading...</h1>
    </main>
  );
}

export const metadata: Metadata = { title: 'Loading...' };
