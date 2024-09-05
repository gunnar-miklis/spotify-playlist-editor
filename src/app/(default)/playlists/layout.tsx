import type { ReactNode } from 'react';
import styles from '@/src/styles/app.module.css';

type Props = { children: ReactNode };

export default function PlaylistLayout({ children }: Props) {
  return <main className={styles.main}>{children}</main>;
}
