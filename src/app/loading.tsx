import type { Metadata } from 'next';

import AppWrapper from '@/src/components/layout/wrappers/AppWrapper/AppWrapper';
import type { DynamicHeadingType, NavLinkType } from '@/src/types';

const title = 'Loading...';
const heading: DynamicHeadingType = {
  level: 1,
  text: title,
};
const navLink: NavLinkType = {
  text: 'Return to Home',
};
export const metadata: Metadata = { title };

export default function Loading() {
  return (
    <AppWrapper heading={heading} navLink={navLink}>
      {null}
    </AppWrapper>
  );
}
