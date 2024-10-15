'use client';

import { useState } from 'react';

import Filter from '@/src/components/playlist/FilterPanel/Filter/Filter';
import styles from '@/src/components/playlist/FilterPanel/filter-panel.module.css';
import type { Track } from '@/src/types';

type Props = { filteredTracks: Track[] };

export default function ReleaseDate({ filteredTracks }: Props) {
  const releaseYears = getArrayOfYears(filteredTracks);

  const [releaseDate, setReleaseDate] = useState<string>(releaseYears[0]);

  return (
    <Filter filterName='releaseDate' filterValue={releaseDate}>
      <select
        className={`${styles['filter-item__release-date-select']} button`}
        onChange={(e) => setReleaseDate(e.target.value)}
      >
        {releaseYears.map((releaseDate) => (
          <option
            className={styles['filter-item__release-date-option']}
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
