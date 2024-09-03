import Link from 'next/link';
import type { Metadata } from 'next';
import apiService from '@/src/utils/apiService';
import TablePlaylistTracks from '@/src/components/TablePlaylistTracks';
import styles from '@/src/styles/app.module.css';

type Props = {
  params: { id: string };
};
export default async function SinglePlaylist({ params: { id } }: Props) {
  const playlistTracks = await apiService.getPlaylistTracks(id);
  const { name, owner, visibility, totalTracks } = await apiService.getOnePlaylist(id);

  return (
    <main className={styles.main}>
      <Link className={styles.link} href='/playlists'>
        Go back
      </Link>
      <h1 className={styles.h1}>Playlist: {name}</h1>

      <dl className={`${styles.dl} ${styles.paper}`}>
        <span>
          <dt>Owner: </dt>
          <dd>{owner}</dd>
        </span>
        <span> | </span>
        <span>
          <dt>Visibility: </dt>
          <dd>{visibility ? 'Public' : 'Private'}</dd>
        </span>
        <span> | </span>
        <span>
          <dt>Total Tracks: </dt>
          <dd>{totalTracks}</dd>
        </span>
      </dl>

      {playlistTracks && <TablePlaylistTracks tracks={playlistTracks} />}
    </main>
  );
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { name } = await apiService.getOnePlaylist(id);
  return { title: name };
}
