import { signIn } from '@/src/auth';

export default function SignIn() {
  return (
    <form
      className='form'
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <button className='button' type='submit'>
        Sign in with Spotify
      </button>
      <br />
      <br />

      <p className='p'>
        <small className='small'>
          *Secure via <strong className='strong'>OAuth</strong>{' '}
          (Industry-standard protocol for authorization)
        </small>
      </p>
    </form>
  );
}
