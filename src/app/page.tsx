import type { Metadata } from 'next';
import { auth } from '@/src/auth';
import SignIn from '@/src/components/auth/SignIn';
import SignOut from '@/src/components/auth/SignOut';
import User from '@/src/components/auth/User';
import styles from '@/src/styles/app.module.css';

export default async function RootPage() {
  const session = await auth();

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Spotify Playlist Assistant</h1>

      <section className={styles.section}>
        <article className={`${styles.article} ${styles.paper}`}>
          {session ? (
            <User {...session.user} />
          ) : (
            <h2 className={styles.h2}>Login</h2>
          )}
        </article>
        <div className={styles.paper}>{session ? <SignOut /> : <SignIn />}</div>
      </section>
    </main>
  );
}

export const metadata: Metadata = { title: 'Spotify Playlist Assistant' };
