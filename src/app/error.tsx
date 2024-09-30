'use client';

import type { Metadata } from 'next';

import MainWrapper from '@/src/components/layout/MainWrapper';
import styles from '@/src/styles/app.module.css';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <MainWrapper
      headerLevel={1}
      headerText='Oops, there was an error.'
      navLink='Return to Home'
    >
      <p className={styles.p}>{error.message}</p>
      <button className={styles.button} onClick={() => reset()}>
        Try again
      </button>
    </MainWrapper>
  );
}

export const metadata: Metadata = { title: 'Error' };
