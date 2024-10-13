'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import styles from '@/src/components/playlist/FilterPanel/Filters/filter.module.css';
import type { TrackProperties } from '@/src/types';
import { capitalizeFirstLetter } from '@/src/utils/functions';

type Props = {
  filterName: TrackProperties;
  filterValue: number | string;
  children: ReactNode;
};

export default function Filter({ filterName, filterValue, children }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // SECTION: get search params from url. if the url has a filter, set it's checkbox to true.
  useEffect(() => {
    searchParams.forEach((_searchValue, searchName) => {
      if (searchName === filterName) setIsChecked(true);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // SECTION: update search params when a filter is added or removed (checkbox is checked / unchecked).
  useEffect(() => {
    // get current search params
    const newSearchParams = new URLSearchParams(searchParams);

    // set or delete search params, when filter is checked
    if (isChecked) newSearchParams.set(filterName, filterValue.toString());
    else newSearchParams.delete(filterName);

    // update url
    let href = `${pathname}?${newSearchParams.toString()}`; // append search params
    if (!newSearchParams.size) href = pathname; // reset url (if no filter set)
    router.replace(href, { scroll: false });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <Paper
      className={`${styles['filter']} ${isChecked && styles['filter--active']} flx-cl flx-btw`}
    >
      <div className={`${styles['filter__header']} flx-cl flx-ctr gp-sm`}>
        <strong className={`p ${styles['filter__title']}`}>
          {capitalizeFirstLetter(filterName)}
        </strong>
        <p className={`p ${styles['filter__current-value']}`}>{filterValue}</p>
      </div>

      {/* TODO: make the entire <Paper> a clickable checkbox, instead of <input> */}
      <input
        className={styles['filter__checkbox']}
        type='checkbox'
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />

      <div className={`${styles['filter__body']} flx-rw flx-ctr gp-sm`}>
        {children}
      </div>
    </Paper>
  );
}
