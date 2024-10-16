'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import styles from '@/src/components/playlist/FilterPanel/filter-panel.module.css';
import type { SortTracksBy, TrackProperties } from '@/src/types';
import {
  booleanToReadable,
  capitalizeFirstLetter,
} from '@/src/utils/functions';

type FilterName = TrackProperties | 'randomize' | 'sorting';
type FilterValue = string | number | 'randomize' | SortTracksBy | null;

type Props = {
  filterName: FilterName;
  filterValue: FilterValue;
  children?: ReactNode;
};

export default function Filter({ filterName, filterValue, children }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // SECTION: update state (isChecked) when url changes and has an entry matching the filterName
  useEffect(() => {
    if (searchParams.has(filterName)) setIsChecked(true);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // SECTION: update search params when a filter is added or removed (checkbox is checked / unchecked).
  useEffect(() => {
    if (!filterValue) return;

    // get current search params
    const newSearchParams = new URLSearchParams(searchParams);

    // set or delete search params, when filter is checked
    if (isChecked) {
      newSearchParams.set(filterName, convertFilterValue(filterValue));
    } else {
      newSearchParams.delete(filterName);
    }

    // update url
    let href = `${pathname}?${newSearchParams.toString()}`; // append search params
    if (!newSearchParams.size) href = pathname; // reset url (if no filter set)
    router.replace(href, { scroll: false });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <Paper
      /* FIXME: somethings wrong with the filter--active.
       * it does get applied, but the visual doesn't change after the inital page load.
       * however, if the page is reloaded manually, it suddenly works.
       */
      className={`${styles['filter-item']} ${isChecked && styles['filter-item--active']} flx-cl flx-btw`}
    >
      <div className={`${styles['filter-item__header']} flx-cl flx-ctr gp-sm`}>
        <strong className={`strong ${styles['filter-item__title']}`}>
          {capitalizeFirstLetter(filterName)}
        </strong>
        <p className={`p ${styles['filter-item__current-value']}`}>
          {displayFilterValue(filterValue, isChecked)}
        </p>
      </div>

      {/* TODO: make the entire <Paper> a clickable checkbox, instead of <input> */}
      <input
        className={styles['filter-item__checkbox']}
        type='checkbox'
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />

      {(!isChecked || !children) && (
        <div className={`${styles['filter-item__body']} flx-rw flx-ctr gp-sm`}>
          {children}
        </div>
      )}
    </Paper>
  );
}

/**
 * Converts the filterValue to a string representation that can be used as a URL search parameter.
 * Handles the different types of filterValue, such as:
 * - 'randomize' -> generate a unique number (to avoid caching of the same order).
 * - array (SortTracksBy) -> convert to a string with the values joined by '+'.
 * - numbers -> convert to string.
 * @param value the filterValue to convert.
 * @returns a string representation of the filterValue.
 * @throws {Error} if the filterValue type is unexpected.
 */
function convertFilterValue(value: FilterValue) {
  // generate a unique number, so that each time the random-order is different (otherwise next.js caches the url and reuse the same order)
  if (value === 'randomize') return Date.now().toString();

  // convert SortTracksBy array to string
  if (Array.isArray(value)) return value.join('+');

  // convert numbers to string
  if (typeof value === 'number') return value.toString();

  // validate strings
  if (typeof value === 'string') return value;

  // handle unexpected filterValue type
  console.error('Unexpected filterValue type.'); // dev
  throw new Error('Unexpected filterValue type.'); // runtime
}

/**
 * Converts the filterValue to a string representation that can be displayed to the user.
 * - for inactive filters: return a dash, representing "null", "none" or "not selected".
 * - for the 'randomize' filter: convert the true/false into a readable "yes/no".
 * @param value the filterValue to convert.
 * @param isActive if the filter is currently selected/active/isChecked.
 * @returns a string representation of the filterValue.
 */
function displayFilterValue(value: FilterValue, isActive: boolean) {
  // handle unselected filters
  if (!value) return '-';

  // display yes/no
  if (value === 'randomize') return booleanToReadable(isActive);

  // convert (numbers) to string
  return value.toString();
}
