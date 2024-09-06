// TODO: style custom sign in page

import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/src/styles/app.module.css';

export default async function SignIn() {
  return (
    <main className={styles.main}>
      <Link className={styles.link} href='/'>
        Return to Home
      </Link>
      <h1 className={styles.h1}>SignIn with OAuth</h1>
      <p className={styles.p}>You are going to be redirected to the Spotify Login in page.</p>
    </main>
  );
}

export const metadata: Metadata = { title: 'SignIn with OAuth' };
