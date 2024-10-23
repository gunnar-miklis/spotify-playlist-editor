import { signOut } from '@/src/auth';
import styles from '@/src/components/auth/auth.module.css';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';

export default function SignOut() {
  return (
    <Paper className={styles['auth']}>
      <form
        className={`form ${styles['auth__form']}`}
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className={`button ${styles['auth__button']}`} type='submit'>
          Sign Out
        </button>
      </form>
    </Paper>
  );
}
