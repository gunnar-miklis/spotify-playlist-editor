import Link from 'next/link';
import type { Metadata } from 'next';
import apiService from '@/src/utils/apiService';
import TablePlaylistTracks from '@/src/components/TablePlaylistTracks';
import styles from '@/src/styles/app.module.css';
import Filter from '@/src/components/Filters';
import type { Track } from '@/src/types';

type Props = {
  params: { id: string };
  searchParams: { popularity: string; duration: string };
};
export default async function SinglePlaylist({ params: { id }, searchParams }: Props) {
  const playlistTracks = await apiService.getPlaylistTracks(id);
  const { name, owner, visibility, totalTracks } = await apiService.getOnePlaylist(id);

  let filteredTracks: Track[] = structuredClone(playlistTracks);
  Object.keys(searchParams).forEach((key) => {
    switch (key) {
      case 'popularity':
        filteredTracks = filteredTracks.filter((track) => track[key] <= Number(searchParams[key]));
      case 'duration':
        filteredTracks = filteredTracks.filter((track) => track[key] <= Number(searchParams[key]));
    }
  });

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

      <Filter
        minPopularity={getMinPopularity(filteredTracks)}
        maxPopularity={getMaxPopularity(filteredTracks)}
      />

      {filteredTracks && <TablePlaylistTracks tracks={filteredTracks} />}
    </main>
  );
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const { name } = await apiService.getOnePlaylist(id);
  return { title: name };
}

function getMinPopularity(allTracks: Track[]): number {
  const popularities = allTracks.map(({ popularity }) => popularity);
  return Math.min(...popularities);
}
function getMaxPopularity(allTracks: Track[]): number {
  const popularities = allTracks.map(({ popularity }) => popularity);
  return Math.max(...popularities);
}
