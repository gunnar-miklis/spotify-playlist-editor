/* eslint-disable simple-import-sort/imports */

import { signIn } from '@/src/auth';
import Disclaimer from '@/src/components/auth/Disclaimer';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import styles from '@/src/components/auth/auth.module.css'; // NOTE: "styles" after "Paper", to apply className correctly

export default function SignIn() {
  return (
    <Paper className={styles['auth']}>
      <form
        className={`form ${styles['auth__form']}`}
        action={async () => {
          'use server';
          await signIn('spotify');
        }}
      >
        <button className={`button ${styles['auth__button']}`} type='submit'>
          Sign in with Spotify
        </button>
      </form>

      <Disclaimer className={styles['auth__disclaimer']} />
    </Paper>
  );
}
