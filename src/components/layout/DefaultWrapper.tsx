import Link from 'next/link';

import styles from '@/src/styles/app.module.css';
import type { WrapperProps } from '@/src/types';
import { getHeadingElement } from '@/src/utils/functions';

export default function DefaultWrapper({
  children,
  headerLevel,
  headerText,
  navLink,
  navLinkHref = '/',
}: WrapperProps) {
  const Heading = getHeadingElement(headerLevel);

  return (
    <>
      {navLink && (
        <nav>
          <Link className={styles.link} href={navLinkHref}>
            {navLink}
          </Link>
        </nav>
      )}
      <header>
        <Heading className={styles[`h${headerLevel}`]}>{headerText}</Heading>
      </header>
      <section className={styles.section}>{children}</section>
    </>
  );
}
