import React from 'react';

import CreateNewPlaylist from '@/src/components/playlist/CreateNewPlaylist';
import Filter from '@/src/components/playlist/Filters';
import type { Playlist, Track } from '@/src/types';

type Props = {
  playlist: Playlist;
  filteredTracks: Track[];
};

export default function FilterPanel({ playlist, filteredTracks }: Props) {
  return (
    <>
      <Filter
        minPopularity={getMinPopularity(filteredTracks)}
        maxPopularity={getMaxPopularity(filteredTracks)}
        releaseYears={getArrayOfYears(filteredTracks)}
      />
      <CreateNewPlaylist playlist={playlist} filteredTracks={filteredTracks} />
    </>
  );
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
  const releaseYears = allTracks.map(({ releaseDate }) =>
    Number(releaseDate.slice(0, 4)),
  );
  return [...new Set(releaseYears)].sort();
}
