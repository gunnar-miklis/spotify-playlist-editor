import type { Metadata } from 'next';

import MainWrapper from '@/src/components/layout/MainWrapper';

export default function Loading() {
  return (
    <MainWrapper headerLevel={1} headerText={title} navLink='Return to Home'>
      <></>
    </MainWrapper>
  );
}

const title = 'Loading...';
export const metadata: Metadata = { title };
