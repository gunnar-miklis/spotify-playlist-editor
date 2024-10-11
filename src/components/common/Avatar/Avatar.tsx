import Image from 'next/image';
import type { ReactNode } from 'react';

import styles from '@/src/components/common/avatar/avatar.module.css';
import { getIntials } from '@/src/utils/functions';

type AvatarProps = { children: ReactNode };

export default function Avatar({ children }: AvatarProps) {
  return <div className={styles.avatar}>{children}</div>;
}

type AvatarImageProps = {
  userName: string;
  userImage?: string | null;
};

export function AvatarImage({ userName, userImage }: AvatarImageProps) {
  if (userImage) {
    return (
      <Image
        className={styles['avatar__image']}
        src={userImage}
        alt={userName}
        width={45}
        height={45}
        loading='lazy'
      />
    );
  }

  return (
    <div className={styles['avatar__placeholder']}>
      <h3>{getIntials(userName)}</h3>
    </div>
  );
}
