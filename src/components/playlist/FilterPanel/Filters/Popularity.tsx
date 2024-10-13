'use client';

import { useState } from 'react';

import Filter from '@/src/components/playlist/FilterPanel/Filters/Filter';
import styles from '@/src/components/playlist/FilterPanel/Filters/filter.module.css';
import type { Track } from '@/src/types';

type Props = { filteredTracks: Track[] };

export default function Popularity({ filteredTracks }: Props) {
  const minPopularity = getMinPopularity(filteredTracks);
  const maxPopularity = getMaxPopularity(filteredTracks);

  const [popularity, setPopularity] = useState<number>(maxPopularity);

  return (
    <Filter filterName='popularity' filterValue={popularity}>
      <p className='p'>{minPopularity}</p>
      <input
        className={styles['filter__popularity-range']}
        type='range'
        min={minPopularity}
        max={maxPopularity}
        value={popularity}
        onChange={(e) => setPopularity(parseInt(e.target.value))}
      />
      <p className='p'>{maxPopularity}</p>
    </Filter>
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
