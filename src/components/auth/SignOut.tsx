import { signOut } from '@/src/auth';

export default function SignOut() {
  return (
    <form
      className='form'
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className='button' type='submit'>
        Sign Out
      </button>
    </form>
  );
}
