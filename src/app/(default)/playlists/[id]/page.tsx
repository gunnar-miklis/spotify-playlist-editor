import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import AppWrapper from '@/src/components/layout/wrappers/AppWrapper/AppWrapper';
import FilterPanel from '@/src/components/playlist/FilterPanel/FilterPanel';
import PlaylistMetadata from '@/src/components/playlist/PlaylistMetadata/PlaylistMetadata';
import Tracks from '@/src/components/playlist/Tracks';
import type {
  DynamicHeadingType,
  NavLinkType,
  Playlist,
  Track,
} from '@/src/types';
import apiService from '@/src/utils/apiService';

const heading: DynamicHeadingType = {
  level: 1,
  text: null,
};
const navLink: NavLinkType = {
  text: 'Go back',
  href: '/playlists',
};
export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const { name } = await apiService.getOnePlaylist(id);
  return { title: name };
}

type Props = {
  params: { id: string };
  searchParams: {
    popularity: string;
    releaseDate: string;
  };
};

export default async function SinglePlaylist({
  params: { id },
  searchParams,
}: Props) {
  const playlist = await apiService.getOnePlaylist(id);
  heading.text = playlist.name;

  const playlistTracks = await apiService.getPlaylistTracks(id);
  let filteredTracks: Track[] = structuredClone(playlistTracks);
  Object.keys(searchParams).forEach((key) => {
    switch (key) {
      case 'popularity':
        filteredTracks = filteredTracks.filter(
          (track) => track[key] <= Number(searchParams[key]),
        );
        break;
      case 'releaseDate':
        filteredTracks = filteredTracks.filter((track) =>
          track[key].includes(searchParams[key]),
        );
        break;
    }
  });

  if (filteredTracks.length) {
    return (
      <Layout playlist={playlist} filteredTracks={filteredTracks}>
        <Tracks tracks={filteredTracks} />
      </Layout>
    );
  }

  return (
    <Layout playlist={playlist} filteredTracks={filteredTracks}>
      <strong className='strong'>No Tracks found</strong>
    </Layout>
  );
}

type LayoutProps = {
  children: ReactNode;
  playlist: Playlist;
  filteredTracks: Track[];
};
function Layout({ children, playlist, filteredTracks }: LayoutProps) {
  return (
    <AppWrapper heading={heading} navLink={navLink}>
      <section className='section' id='playlist-metadata'>
        <PlaylistMetadata {...playlist} />
      </section>

      <section className='section flx-rw flx-w' id='filter-panel'>
        <FilterPanel playlist={playlist} filteredTracks={filteredTracks} />
      </section>

      <section className='section' id='playlist-tracks'>
        {children}
      </section>
    </AppWrapper>
  );
}
