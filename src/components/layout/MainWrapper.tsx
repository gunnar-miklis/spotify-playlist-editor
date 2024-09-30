import DefaultWrapper from '@/src/components/layout/DefaultWrapper';
import styles from '@/src/styles/app.module.css';
import type { WrapperProps } from '@/src/types';

export default function MainWrapper({
  children,
  headerLevel,
  headerText,
  navLink,
  navLinkHref = '/',
}: WrapperProps) {
  return (
    <main className={styles.main}>
      <DefaultWrapper
        headerLevel={headerLevel}
        headerText={headerText}
        navLink={navLink}
        navLinkHref={navLinkHref}
      >
        {children}
      </DefaultWrapper>
    </main>
  );
}
