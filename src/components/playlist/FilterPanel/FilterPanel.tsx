import React from 'react';

import CreateNewPlaylist from '@/src/components/playlist/CreateNewPlaylist/CreateNewPlaylist';
import Popularity from '@/src/components/playlist/FilterPanel/Filters/Popularity';
import ReleaseDate from '@/src/components/playlist/FilterPanel/Filters/ReleaseDate';
import type { Playlist, Track } from '@/src/types';

type Props = {
  playlist: Playlist;
  filteredTracks: Track[];
};

export default function FilterPanel({ playlist, filteredTracks }: Props) {
  return (
    <>
      <Popularity filteredTracks={filteredTracks} />

      <ReleaseDate filteredTracks={filteredTracks} />

      <CreateNewPlaylist filteredTracks={filteredTracks} playlist={playlist} />
    </>
  );
}
