'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type ChangeEventHandler, useRef, useState } from 'react';

import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import styles from '@/src/components/playlist/FilterPanel/Filters/filters.module.css';

type Props = {
  minPopularity: number;
  maxPopularity: number;
  releaseYears: number[];
};

export default function Filter({
  minPopularity,
  maxPopularity,
  releaseYears,
}: Props) {
  const selectedFilters = useRef<Map<string, string>>(new Map());
  const [popularity, setPopularity] = useState<number>(maxPopularity);
  const [releaseDate, setReleaseDate] = useState<string>(
    releaseYears[0].toString(),
  );

  const router = useRouter();
  const pathname = usePathname();

  const handleFiltering: ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (e.target.checked) selectedFilters.current.set(key, value);
    else selectedFilters.current.delete(key);

    const params = Array.from(
      selectedFilters.current,
      ([key, value]) => key + '=' + value,
    );
    const href = `${pathname}?${params.join('&')}`;
    router.replace(href);
  };

  return (
    <>
      {/* SECTION: popularity filter */}
      <Paper className='flex-col'>
        <div className='flex-row gap-sm' style={{ alignItems: 'center' }}>
          <input
            className={styles.checkbox}
            type='checkbox'
            name='popularity'
            value={popularity}
            onChange={handleFiltering}
          />
          <label className={styles.label}>Popularity: {popularity}</label>
        </div>

        <div className='flex-row gap-sm' style={{ alignItems: 'center' }}>
          <p className='p'>{minPopularity}</p>
          <input
            className={styles.range}
            type='range'
            min={minPopularity}
            max={maxPopularity}
            value={popularity}
            onChange={(e) => setPopularity(parseInt(e.target.value))}
          />
          <p className='p'>{maxPopularity}</p>
        </div>
      </Paper>

      {/* SECTION: release date filter */}
      <Paper className='flex-col'>
        <div className='flex-row gap-sm' style={{ alignItems: 'center' }}>
          <input
            className={styles.checkbox}
            type='checkbox'
            name='releaseDate'
            value={releaseDate}
            onChange={handleFiltering}
          />
          <label className={styles.label}>Year: {releaseDate}</label>
        </div>

        <div className='flex-row gap-sm' style={{ alignItems: 'center' }}>
          <select
            className={`${styles.select} button`}
            onChange={(e) => setReleaseDate(e.target.value)}
          >
            {releaseYears.map((releaseDate) => (
              <option key={releaseDate} value={releaseDate}>
                {releaseDate}
              </option>
            ))}
          </select>
        </div>
      </Paper>
    </>
  );
}