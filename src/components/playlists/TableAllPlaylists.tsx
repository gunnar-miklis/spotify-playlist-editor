'use client';

import Link from 'next/link';
import { useState } from 'react';

import SortingIcon from '@/src/components/common/SortingIcon/SortingIcon';
import styles from '@/src/components/layout/Table/table.module.css';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import type { Playlist } from '@/src/types';
import { sortObjectsByField as sortPlaylists } from '@/src/utils/functions';

type Props = { playlists: Playlist[] };

export default function TableAllPlaylists({ playlists }: Props) {
  const [table, setTable] = useState<Playlist[]>(playlists);
  const [isAsc, setIsAsc] = useState<boolean>(null!);

  function handleSortTable(field: keyof Playlist) {
    if (!field) {
      setTable(playlists);
      setIsAsc(null!);
    } else {
      const [sortedPlaylists, isAscToggled] = sortPlaylists<Playlist>(
        field,
        playlists,
        isAsc,
      );
      setTable(sortedPlaylists);
      setIsAsc(isAscToggled);
    }
  }

  if (!table || !table.length) return;
  <Paper>
    <h2 className='h2'>No playlists found</h2>;
  </Paper>;

  return (
    <Paper className={styles['table']}>
      <table className={styles['table__wrapper']}>
        <thead className={styles['table__header']}>
          <tr className={styles['table__row']}>
            {Object.keys(table[0]).map(
              (objectKey) =>
                objectKey !== 'id' && (
                  <th className={styles['table__cell-head']} key={objectKey}>
                    <button
                      className={styles['table__sort-button']}
                      onClick={() =>
                        handleSortTable(objectKey as keyof Playlist)
                      }
                    >
                      {objectKey}
                      <SortingIcon />
                    </button>
                  </th>
                ),
            )}
          </tr>
        </thead>
        <tbody className={styles['table__body']}>
          {table.map(({ id, name, visibility, totalTracks, owner }) => (
            <tr className={styles['table__row']} key={id}>
              <td className={styles['table__cell']}>
                <Link className='link' href={`/playlists/${id}`}>
                  {name}
                </Link>
              </td>
              <td className={styles['table__cell']}>{owner}</td>
              <td className={styles['table__cell']}>
                {visibility ? 'public' : 'private'}
              </td>
              <td className={styles['table__cell']}>{totalTracks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}
