import { signOut } from '@/src/auth';
import styles from '@/src/styles/app.module.css';

export default function SignOut() {
  return (
    <form
      className={styles.form}
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className={styles.button} type='submit'>
        Sign Out
      </button>
    </form>
  );
}
