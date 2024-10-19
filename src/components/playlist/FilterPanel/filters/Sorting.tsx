'use client';

import { useSearchParams } from 'next/navigation';
import { type ChangeEventHandler, useEffect, useState } from 'react';

import Filter from '@/src/components/playlist/FilterPanel/Filter/Filter';
import styles from '@/src/components/playlist/FilterPanel/filter-panel.module.css';
import type { SortTracksBy, Track, TrackProperties } from '@/src/types';
import { capitalizeFirstLetter } from '@/src/utils/functions';

const propertiesToSortBy: TrackProperties[] = [
  'artists',
  'duration',
  'name',
  'popularity',
  'releaseDate',
];

type Props = { track: Track };

export default function Sorting({ track }: Props) {
  const [selection, setSelection] = useState<SortTracksBy>(null!);

  // update state (filterValue) when url changes
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.has('sorting')) {
      const [sortingProperty, sortingOrder] = searchParams
        .get('sorting')!
        .split('+') as SortTracksBy;
      setSelection([sortingProperty, sortingOrder]);
    }
  }, [searchParams]);

  const handleSelection: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const [property, sortingOrder] = e.target.value.split('+') as SortTracksBy;
    setSelection([property, sortingOrder]);
  };

  return (
    <Filter filterName='sorting' filterValue={selection}>
      <select
        className={`${styles['filter-item__select']} button`}
        onChange={handleSelection}
        defaultValue='default'
      >
        <option
          className={styles['filter-item__option']}
          value='default'
          disabled
        >
          Sort Tracks by
        </option>
        {Object.keys(track as object).map(
          (objectKey) =>
            propertiesToSortBy.includes(objectKey as keyof Track) && (
              <>
                <option
                  className={styles['filter-item__option']}
                  key={[objectKey, 'asc'].join('+')}
                  value={[objectKey, 'asc'].join('+')}
                >
                  {capitalizeFirstLetter(objectKey)} (ascending)
                </option>
                <option
                  className={styles['filter-item__option']}
                  key={[objectKey, 'desc'].join('+')}
                  value={[objectKey, 'desc'].join('+')}
                >
                  {capitalizeFirstLetter(objectKey)} (descending)
                </option>
              </>
            ),
        )}
      </select>
    </Filter>
  );
}