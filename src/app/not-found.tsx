import type { Metadata } from 'next';

import MainWrapper from '@/src/components/layout/MainWrapper';
import styles from '@/src/styles/app.module.css';

export default function NotFound() {
  return (
    <MainWrapper headerLevel={1} headerText={title} navLink='Return to Home'>
      <p className={styles.p}>Could not find requested resource</p>
    </MainWrapper>
  );
}

const title = 'Not Found';
export const metadata: Metadata = { title };
