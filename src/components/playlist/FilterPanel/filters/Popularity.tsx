'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Filter from '@/src/components/playlist/FilterPanel/Filter/Filter';
import styles from '@/src/components/playlist/FilterPanel/filter-panel.module.css';
import type { Track } from '@/src/types';

type Props = { filteredTracks: Track[] };

export default function Popularity({ filteredTracks }: Props) {
  const minPopularity = getMinPopularity(filteredTracks);
  const maxPopularity = getMaxPopularity(filteredTracks);
  const [popularity, setPopularity] = useState<string>(null!);

  // update state (filterValue) when url changes
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.has('popularity')) {
      setPopularity(searchParams.get('popularity')!);
    }
  }, [searchParams]);

  return (
    <Filter filterName='popularity' filterValue={popularity}>
      <p className='p'>{minPopularity}</p>
      <input
        className={styles['filter-item__popularity-range']}
        type='range'
        min={minPopularity}
        max={maxPopularity}
        value={popularity}
        onChange={(e) => setPopularity(e.target.value)}
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
