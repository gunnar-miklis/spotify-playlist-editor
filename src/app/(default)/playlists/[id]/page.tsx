import type { Metadata } from 'next';
import Link from 'next/link';
import type { Track } from '@/src/types';
import apiService from '@/src/utils/apiService';
import Filter from '@/src/components/playlist/Filters';
import TablePlaylistTracks from '@/src/components/playlist/TablePlaylistTracks';
import CreateNewPlaylist from '@/src/components/playlist/CreateNewPlaylist';
import PlaylistMetadata from '@/src/components/playlist/PlaylistMetadata';
import styles from '@/src/styles/app.module.css';

type Props = {
  params: { id: string };
  searchParams: {
    popularity: string;
    releaseDate: string;
  };
};
export default async function SinglePlaylist({ params: { id }, searchParams }: Props) {
  const playlist = await apiService.getOnePlaylist(id);
  const playlistTracks = await apiService.getPlaylistTracks(id);

  let filteredTracks: Track[] = structuredClone(playlistTracks);
  Object.keys(searchParams).forEach((key) => {
    switch (key) {
      case 'popularity':
        filteredTracks = filteredTracks.filter((track) => track[key] <= Number(searchParams[key]));
        break;
      case 'releaseDate':
        filteredTracks = filteredTracks.filter((track) => track[key].includes(searchParams[key]));
        break;
    }
  });

  return (
    <>
      <Link className={styles.link} href='/playlists'>
        Go back
      </Link>

      <h1 className={styles.h1}>Playlist: {playlist.name}</h1>

      <section className={`${styles.section} ${styles.paper}`}>
        <PlaylistMetadata {...playlist} />
      </section>

      <section
        className={`${styles.section} ${styles['flex-row']} ${styles['flex-wrap']} ${styles['gap-sm']}`}
      >
        <Filter
          minPopularity={getMinPopularity(filteredTracks)}
          maxPopularity={getMaxPopularity(filteredTracks)}
          releaseYears={getArrayOfYears(filteredTracks)}
        />
        <CreateNewPlaylist playlist={playlist} filteredTracks={filteredTracks} />
      </section>

      <section className={`${styles.section} ${styles['table-wrapper']} ${styles.paper}`}>
        {filteredTracks && <TablePlaylistTracks tracks={filteredTracks} />}
      </section>
    </>
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

function getArrayOfYears(allTracks: Track[]): number[] {
  const releaseYears = allTracks.map(({ releaseDate }) => Number(releaseDate.slice(0, 4)));
  return [...new Set(releaseYears)].sort();
}
