import type { Metadata } from 'next';

import AppWrapper from '@/src/components/layout/wrappers/AppWrapper/AppWrapper';
import type { DynamicHeadingType, NavLinkType } from '@/src/types';

const title = 'Not Found';
const heading: DynamicHeadingType = {
  level: 1,
  text: title,
};
const navLink: NavLinkType = {
  text: 'Return to Home',
};
export const metadata: Metadata = { title };

export default function NotFound() {
  return (
    <AppWrapper heading={heading} navLink={navLink}>
      <p className='p'>Could not find requested resource</p>
    </AppWrapper>
  );
}
