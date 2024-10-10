import React, { type HTMLAttributes, type ReactNode } from 'react';

import styles from '@/src/components/layout/wrappers/Paper/paper.module.css';

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Paper({ children, className }: Props) {
  return <div className={`${styles.paper} ${className ?? ''}`}>{children}</div>;
}
