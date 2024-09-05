import type { Metadata } from 'next';
import Link from 'next/link';
import apiService from '@/src/utils/apiService';
import TableAllPlaylists from '@/src/components/playlists/TableAllPlaylists';
import styles from '@/src/styles/app.module.css';

export default async function AllPlaylists() {
  const playlists = await apiService.getAllPlaylists();

  return (
    <>
      <Link className={styles.link} href='/'>
        Go back
      </Link>

      <h1 className={styles.h1}>Playlists</h1>
      {playlists ? (
        <section className={`${styles.section} ${styles['table-wrapper']} ${styles.paper}`}>
          <TableAllPlaylists playlists={playlists} />
        </section>
      ) : (
        <div className={styles.paper}>
          <strong className={styles.p}>No found</strong>
        </div>
      )}
    </>
  );
}

export const metadata: Metadata = {
  title: 'Playlists',
  description: "Current User's Playlists",
};
