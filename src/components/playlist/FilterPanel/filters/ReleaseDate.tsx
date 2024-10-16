'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Filter from '@/src/components/playlist/FilterPanel/Filter/Filter';
import styles from '@/src/components/playlist/FilterPanel/filter-panel.module.css';
import type { Track } from '@/src/types';

type Props = { filteredTracks: Track[] };

export default function ReleaseDate({ filteredTracks }: Props) {
  const releaseYears = getArrayOfYears(filteredTracks);
  const [releaseDate, setReleaseDate] = useState<string>(null!);

  // update state (filterValue) when url changes
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.has('releaseDate')) {
      setReleaseDate(searchParams.get('releaseDate')!);
    }
  }, [searchParams]);

  return (
    <Filter filterName='releaseDate' filterValue={releaseDate}>
      <select
        className={`${styles['filter-item__select']} button`}
        onChange={(e) => setReleaseDate(e.target.value)}
        defaultValue='default'
      >
        <option
          className={styles['filter-item__option']}
          value='default'
          disabled
        >
          Select a year
        </option>
        {releaseYears.map((releaseDate) => (
          <option
            className={styles['filter-item__option']}
            key={releaseDate}
            value={releaseDate}
          >
            {releaseDate}
          </option>
        ))}
      </select>
    </Filter>
  );
}

function getArrayOfYears(allTracks: Track[]): string[] {
  const allReleaseYears = allTracks.map(({ releaseDate }) =>
    Number(releaseDate.slice(0, 4)).toString(),
  );
  const uniqueAndSortedYears = [...new Set(allReleaseYears)].sort();
  return uniqueAndSortedYears;
}
