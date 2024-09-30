import type { Metadata } from 'next';

import { auth } from '@/src/auth';
import SignIn from '@/src/components/auth/SignIn';
import SignOut from '@/src/components/auth/SignOut';
import User from '@/src/components/auth/User';
import MainWrapper from '@/src/components/layout/MainWrapper';
import styles from '@/src/styles/app.module.css';

export default async function RootPage() {
  const session = await auth();

  if (session) {
    return (
      <MainWrapper headerLevel={1} headerText={title}>
        <article className={`${styles.article} ${styles.paper}`}>
          <User {...session.user} />
        </article>
        <div className={styles.paper}>
          <SignOut />
        </div>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper headerLevel={1} headerText={title}>
      <article className={`${styles.article} ${styles.paper}`}>
        <h2 className={styles.h2}>Login</h2>
      </article>
      <div className={styles.paper}>
        <SignIn />
      </div>
    </MainWrapper>
  );
}

const title = 'Spotify Playlist Assistant';
export const metadata: Metadata = { title };
