import { signIn } from '@/src/auth';
import styles from '@/src/styles/app.module.css';

export default function SignIn() {
  return (
    <form
      className={styles.form}
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <button className={styles.button} type='submit'>
        Sign in with Spotify
      </button>
      <br />
      <br />

      <p className={styles.p}>
        <small className={styles.small}>
          *Secure via <strong className={styles.strong}>OAuth</strong> (Industry-standard protocol
          for authorization)
        </small>
      </p>
    </form>
  );
}
