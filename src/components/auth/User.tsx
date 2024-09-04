import type { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/src/styles/app.module.css';

export default function User({ name, image }: User) {
  if (!name) return <h2>User is not authenticated</h2>;
  else
    return (
      <>
        <div className={`${styles.paper} ${styles['flex-row']} ${styles['flex-between']}`}>
          <h2 className={styles.h2}>Hello {name} !</h2>
          {image ? (
            <div className={styles.avatar}>
              <Image
                className={styles.image}
                src={image}
                alt={name}
                width={45}
                height={45}
                loading='lazy'
              />
            </div>
          ) : (
            <div className={styles.avatar}>
              <div className={styles.placeholder}>
                <h3>{(name[0] + name[1]).toUpperCase()}</h3>
              </div>
            </div>
          )}
        </div>
        <div className={styles.paper}>
          <Link className={styles.link} style={{ color: 'var(--col-text)' }} href='/playlists'>
            View Playlists
          </Link>
        </div>
      </>
    );
}
