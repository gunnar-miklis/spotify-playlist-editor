import Image from 'next/image';

import styles from '@/src/components/common/avatar/avatar.module.css';
import { getIntials } from '@/src/utils/functions';

type Props = {
  userName: string;
  userImage?: string | null;
};

export default function AvatarImage({ userName, userImage }: Props) {
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
