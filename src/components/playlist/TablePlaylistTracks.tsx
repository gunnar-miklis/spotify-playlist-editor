'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import SortingIcon from '@/src/components/common/SortingIcon/SortingIcon';
import styles from '@/src/components/layout/Table/table.module.css';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import AudioPlayback from '@/src/components/playlist/AudioPlayback';
import type { Track } from '@/src/types';
import {
  msToMin,
  sortObjectsByField as sortTracks,
} from '@/src/utils/functions';

type Props = { tracks: Track[] };

export default function TablePlaylistTracks({ tracks }: Props) {
  const [table, setTable] = useState<Track[]>(tracks);
  const [isAsc, setIsAsc] = useState<boolean>(null!);

  useEffect(() => setTable(tracks), [tracks]);

  function handleSortTable(field: keyof Track) {
    if (!field) {
      setTable(tracks);
      setIsAsc(null!);
    } else {
      const [sortedTracks, isAscToggled] = sortTracks<Track>(
        field,
        tracks,
        isAsc,
      );
      setTable(sortedTracks);
      setIsAsc(isAscToggled);
    }
  }

  if (!table || !table.length) return;
  <Paper>
    <h2 className='h2'>No tracks found</h2>;
  </Paper>;

  return (
    <Paper className={styles['table']}>
      <table className={styles['table__wrapper']}>
        <thead className={styles['table__header']}>
          <tr className={styles['table__row']}>
            {Object.keys(table[0]).map((objectKey) => {
              if (
                objectKey === 'name' ||
                objectKey === 'duration' ||
                objectKey === 'artists' ||
                objectKey === 'releaseDate' ||
                objectKey === 'popularity'
              ) {
                return (
                  <th className={styles['table__cell-head']} key={objectKey}>
                    <button
                      className={styles['table__sort-button']}
                      onClick={() => handleSortTable(objectKey as keyof Track)}
                    >
                      {objectKey}
                      <SortingIcon />
                    </button>
                  </th>
                );
              }
            })}
            <th>PREVIEW</th>
          </tr>
        </thead>
        <tbody className={styles['table__body']}>
          {table.map(
            ({
              id,
              name,
              duration,
              artists,
              popularity,
              releaseDate,
              previewUrl,
              openSpotify,
            }) => (
              <tr className={styles['table__row']} key={id}>
                <td className={styles['table__cell']}>
                  <Link className='link' href={openSpotify} target='_blank'>
                    {name}
                  </Link>
                </td>
                <td className={styles['table__cell']}>{artists}</td>
                <td className={styles['table__cell']}>{msToMin(duration)}</td>
                <td className={styles['table__cell']}>{popularity}</td>
                <td className={styles['table__cell']}>{releaseDate}</td>
                <td
                  className={styles['table__cell']}
                  style={{ display: 'flex' }}
                >
                  <AudioPlayback source={previewUrl} />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </Paper>
  );
}
