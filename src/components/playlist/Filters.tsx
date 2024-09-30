'use client';

import { useRef, useState, type ChangeEventHandler } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/src/styles/app.module.css';

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
      <article className={`${styles.article} ${styles.paper}`}>
        <div
          className={`${styles['flex-row']} ${styles['gap-sm']}`}
          style={{ alignItems: 'center' }}
        >
          <input
            className={styles.checkbox}
            type='checkbox'
            name='popularity'
            value={popularity}
            onChange={handleFiltering}
          />
          <strong className={styles.p}>Popularity: {popularity}</strong>
        </div>

        <div
          className={`${styles['flex-row']} ${styles['gap-sm']}`}
          style={{ alignItems: 'center' }}
        >
          <p className={styles.p}>{minPopularity}</p>
          <input
            className={styles.range}
            type='range'
            min={minPopularity}
            max={maxPopularity}
            value={popularity}
            onChange={(e) => setPopularity(parseInt(e.target.value))}
          />
          <p className={styles.p}>{maxPopularity}</p>
        </div>
      </article>

      <article className={`${styles.article} ${styles.paper}`}>
        <div
          className={`${styles['flex-row']} ${styles['gap-sm']}`}
          style={{ alignItems: 'center' }}
        >
          <input
            className={styles.checkbox}
            type='checkbox'
            name='releaseDate'
            value={releaseDate}
            onChange={handleFiltering}
          />
          <strong className={styles.p}>Year: {releaseDate}</strong>
        </div>

        <div
          className={`${styles['flex-row']} ${styles['gap-sm']}`}
          style={{ alignItems: 'center' }}
        >
          <select
            className={`${styles.select} ${styles.button}`}
            onChange={(e) => setReleaseDate(e.target.value)}
          >
            {releaseYears.map((releaseDate) => (
              <option key={releaseDate} value={releaseDate}>
                {releaseDate}
              </option>
            ))}
          </select>
        </div>
      </article>
    </>
  );
}
