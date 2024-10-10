import React, { type ReactNode } from 'react';

import styles from '@/src/components/common/avatar/avatar.module.css';

type Props = {
  children: ReactNode;
};

export default function Avatar({ children }: Props) {
  return <div className={styles.avatar}>{children}</div>;
}
