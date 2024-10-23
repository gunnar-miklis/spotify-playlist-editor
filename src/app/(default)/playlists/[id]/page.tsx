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
  SortTracksBy,
  Track,
  TrackProperties,
} from '@/src/types';
import apiService from '@/src/utils/apiService';
import { shuffleArray, sortObjectsByField } from '@/src/utils/functions';

// SECTION: constants
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

// SECTION: component
type Props = {
  params: { id: string };
  searchParams: TrackProperties;
};

export default async function SinglePlaylist({
  params: { id },
  searchParams,
}: Props) {
  // get playlist metadata
  const playlist = await apiService.getOnePlaylist(id);
  heading.text = playlist.name;

  // get playlist tracks
  const playlistTracks = await apiService.getPlaylistTracks(id);
  const filteredTracks = handleFiltering(playlistTracks, searchParams);

  // set total tracks based on the actual number of fetched tracks
  playlist.totalTracks = playlistTracks.length;

  // calculate total duration and add to playlist metadata
  const totalDuration = getTotalDuration(playlistTracks);
  playlist.totalDuration = totalDuration;

  // show tracks
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

// SECTION: Layout
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

      <section className='section' id='filter-panel'>
        <FilterPanel playlist={playlist} filteredTracks={filteredTracks} />
      </section>

      <section className='section' id='playlist-tracks'>
        {children}
      </section>
    </AppWrapper>
  );
}

// SECTION: handle filtering
/**
 * Filters, sorts or randomize the playlist tracks based on the URL search parameters.
 * @param playlistTracks - the inital array of tracks fetched from the Spotify API (playlistTracks).
 * @param searchParams - an object containing key-value pairs. Keys are expect to match the properties of a track object.
 * @returns a new array of tracks (filteredTracks) that have been processed (filter, sort: asc/desc, shuffle).
 */
function handleFiltering(
  playlistTracks: Track[],
  searchParams: TrackProperties,
): Track[] {
  // re-assigning to filteredTracks allow to narrow down the results.
  let filteredTracks = structuredClone(playlistTracks);

  // loop through all search params. each iteration will narrow down the results.
  Object.entries(searchParams).forEach(([searchKey, searchValue]) => {
    switch (searchKey) {
      case 'popularity':
        filteredTracks = filteredTracks.filter(
          (track) => track[searchKey] <= Number(searchValue),
        );
        break;

      case 'releaseDate':
        filteredTracks = filteredTracks.filter((track) =>
          track[searchKey].includes(searchValue),
        );
        break;

      case 'randomize':
        filteredTracks = shuffleArray(filteredTracks);
        break;

      case 'sorting':
        // get the correct values from searchParams
        const [trackProperty, sortingOrder] = searchValue.split(
          '+',
        ) as SortTracksBy;

        // perform sorting for either ascending or descending
        if (sortingOrder === 'asc') {
          [filteredTracks] = sortObjectsByField(
            trackProperty,
            filteredTracks,
            true,
          );
          break;
        }

        if (sortingOrder === 'desc') {
          [filteredTracks] = sortObjectsByField(
            trackProperty,
            filteredTracks,
            false,
          );
          break;
        }
    }
  });

  return filteredTracks;
}

/**
 * Calculates the total duration of all tracks.
 * @param tracks the array of tracks to calculate the total duration from.
 * @returns the total duration in milliseconds.
 */
function getTotalDuration(tracks: Track[]): number {
  const totalMs = tracks.reduce((sum, { duration }) => sum + duration, 0);
  return totalMs;
}
