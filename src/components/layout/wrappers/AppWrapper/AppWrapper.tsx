import Link from 'next/link';
import type { ReactNode } from 'react';

import DynamicHeading from '@/src/components/common/DynamicHeading/DynamicHeading';
import type { DynamicHeadingType, NavLinkType } from '@/src/types';
import { convertToKebabCase } from '@/src/utils/functions';

export type Props = {
  children: ReactNode | null;
  heading: DynamicHeadingType;
  navLink?: NavLinkType;
};

export default function AppWrapper({ navLink, heading, children }: Props) {
  if (navLink && children) {
    return (
      <>
        <nav className='nav'>
          <Link className='link' href={navLink.href ?? '/'}>
            {navLink.text}
          </Link>
        </nav>

        <header className='header'>
          <DynamicHeading level={heading.level}>{heading.text}</DynamicHeading>
        </header>

        <main className='main' id={convertToKebabCase(heading.text ?? '')}>
          {children}
        </main>
      </>
    );
  }

  if (navLink && !children) {
    return (
      <>
        <nav className='nav'>
          <Link className='link' href={navLink.href ?? '/'}>
            {navLink.text}
          </Link>
        </nav>

        <header className='header'>
          <DynamicHeading level={heading.level}>{heading.text}</DynamicHeading>
        </header>
      </>
    );
  }

  if (children) {
    return (
      <>
        <header className='header'>
          <DynamicHeading level={heading.level}>{heading.text}</DynamicHeading>
        </header>

        <main className='main' id={convertToKebabCase(heading.text ?? '')}>
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <header className='header'>
        <DynamicHeading level={heading.level}>{heading.text}</DynamicHeading>
      </header>
    </>
  );
}
