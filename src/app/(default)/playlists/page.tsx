import Link from 'next/link';
import type { Metadata } from 'next';
import apiService from '@/src/utils/apiService';
import TableAllPlaylists from '@/src/components/TableAllPlaylists';
import styles from '@/src/styles/app.module.css';

export default async function AllPlaylists() {
  const playlists = await apiService.getAllPlaylists();

  return (
    <main className={styles.main}>
      <Link className={styles.link} href='/'>
        Go back
      </Link>
      <h1 className={styles.h1}>Playlists</h1>
      {playlists && <TableAllPlaylists playlists={playlists} />}
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Playlists',
  description: "Current User's Playlists",
};
