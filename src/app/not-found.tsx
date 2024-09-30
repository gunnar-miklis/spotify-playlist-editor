import type { Metadata } from 'next';
import Link from 'next/link';

import styles from '@/src/styles/app.module.css';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Link className={styles.link} href='/'>
        Return to Home
      </Link>
      <h1 className={styles.h1}>NotFound</h1>
      <p className={styles.p}>Could not find requested resource</p>
    </main>
  );
}

export const metadata: Metadata = { title: 'NotFound' };
