'use client';

import { useRef, useState, type ChangeEventHandler } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/src/styles/app.module.css';

type Props = {
  minPopularity: number;
  maxPopularity: number;
};
export default function Filter({ minPopularity, maxPopularity }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const selectedFilters = useRef<Map<string, string>>(new Map());
  const [popularity, setPopularity] = useState<number>(maxPopularity);
  const [duration, setDuration] = useState<number>(0);

  const handleFiltering: ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (e.target.checked) selectedFilters.current.set(key, value);
    else selectedFilters.current.delete(key);

    const params = Array.from(selectedFilters.current, ([key, value]) => key + '=' + value);
    const href = `${pathname}?${params.join('&')}`;
    router.replace(href);
  };

  return (
    <section className={styles.section}>
      <div className={`${styles['flex-row']} ${styles['gap-sm']}`}>
        <form className={`${styles.form} ${styles['flex-row']} ${styles['gap-sm']}`}>
          <div className={styles.paper}>
            Popularity: {popularity}
            <br />
            <input
              className={styles.checkbox}
              type='checkbox'
              name='popularity'
              value={popularity}
              onChange={handleFiltering}
            />
            <br />
            {minPopularity}
            <input
              className={styles.range}
              type='range'
              min={minPopularity}
              max={maxPopularity}
              value={popularity}
              onChange={(e) => setPopularity(parseInt(e.target.value))}
            />
            {maxPopularity}
          </div>

          <div className={styles.paper}>
            Duration: {duration}
            <br />
            <input
              className={styles.checkbox}
              type='checkbox'
              name='duration'
              value={duration}
              onChange={handleFiltering}
            />
            <br />
            {0} {/* FIXME */}
            <input
              className={styles.range}
              type='range'
              min={0}
              max={5}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
            {5} {/* FIXME */}
          </div>
        </form>
      </div>
    </section>
  );
}
