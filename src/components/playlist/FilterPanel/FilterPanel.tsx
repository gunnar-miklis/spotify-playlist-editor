import React from 'react';

import CreateNewPlaylist from '@/src/components/playlist/FilterPanel/CreateNewPlaylist/CreateNewPlaylist';
import styles from '@/src/components/playlist/FilterPanel/filter-panel.module.css';
import Popularity from '@/src/components/playlist/FilterPanel/filters/Popularity';
import Randomize from '@/src/components/playlist/FilterPanel/filters/Randomize';
import ReleaseDate from '@/src/components/playlist/FilterPanel/filters/ReleaseDate';
import Sorting from '@/src/components/playlist/FilterPanel/filters/Sorting';
import type { Playlist, Track } from '@/src/types';

type Props = {
  playlist: Playlist;
  filteredTracks: Track[];
};

export default function FilterPanel({ playlist, filteredTracks }: Props) {
  return (
    <div className={`${styles['filter-panel']} flx-rw flx-w gp-md`}>
      <Popularity filteredTracks={filteredTracks} />
      <ReleaseDate filteredTracks={filteredTracks} />
      <Sorting track={filteredTracks[0]} />
      <Randomize />

      <CreateNewPlaylist filteredTracks={filteredTracks} playlist={playlist} />
    </div>
  );
}
