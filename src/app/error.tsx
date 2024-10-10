'use client';

import type { Metadata } from 'next';
import { signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

import AppWrapper from '@/src/components/layout/wrappers/AppWrapper/AppWrapper';
import type { DynamicHeadingType, NavLinkType } from '@/src/types';

const title = 'Error';
const heading: DynamicHeadingType = {
  level: 1,
  text: 'Oops, there was an error.',
};
const navLink: NavLinkType = {
  text: 'Return to Home',
};
export const metadata: Metadata = { title };

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  // SECTION: Sign out if user is not authenticated and give option to sign in
  // sign out user
  useEffect(() => {
    if (
      error.message === 'User is not authenticated' ||
      error.message.includes('Unauthorized')
    ) {
      (async () => await signOut)();
    }
  }, [error.message]);

  // access denied message + give option to sign in
  if (
    error.message === 'User is not authenticated' ||
    error.message.includes('Unauthorized')
  ) {
    const heading: DynamicHeadingType = {
      level: 1,
      text: 'Unauthorized',
    };
    return (
      <AppWrapper heading={heading} navLink={navLink}>
        <p>You must be logged in.</p>
        <button className='button' onClick={() => signIn()}>
          Sign in
        </button>
      </AppWrapper>
    );
  }

  // SECTION: Display unexpected error messages
  return (
    <AppWrapper heading={heading} navLink={navLink}>
      <p className='p'>{error.message}</p>
      <button className='button' onClick={() => reset()}>
        Try again
      </button>
    </AppWrapper>
  );
}
