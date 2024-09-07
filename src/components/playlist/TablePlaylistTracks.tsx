'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Track } from '@/src/types';
import { msToMin, sortObjectsByField as sortTracks } from '@/src/utils/functions';
import AudioPlayback from './AudioPlayback';
import styles from '@/src/styles/app.module.css';

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
      const [sortedTracks, isAscToggled] = sortTracks<Track>(field, tracks, isAsc);
      setTable(sortedTracks);
      setIsAsc(isAscToggled);
    }
  }

  if (!table || !table.length) return;
  <div className={styles.paper}>
    <h2 className={styles.h2}>No tracks found</h2>;
  </div>;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {Object.keys(table[0]).map((objectKey) => {
            if (
              objectKey === 'name' ||
              objectKey === 'duration' ||
              objectKey === 'artists' ||
              objectKey === 'releaseDate' ||
              objectKey === 'popularity'
            ) {
              return (
                <th key={objectKey}>
                  <button onClick={() => handleSortTable(objectKey as keyof Track)}>
                    {objectKey}
                    <div>
                      <span>&#x25B4;</span>
                      <span>&#x25BE;</span>
                    </div>
                  </button>
                </th>
              );
            }
          })}
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {table.map(
          ({ id, name, duration, artists, popularity, releaseDate, previewUrl, openSpotify }) => (
            <tr key={id}>
              <td>
                <Link className={styles.link} href={openSpotify} target='_blank'>
                  {name}
                </Link>
              </td>
              <td>{artists}</td>
              <td>{msToMin(duration)}</td>
              <td>{popularity}</td>
              <td>{releaseDate}</td>
              <td style={{ display: 'flex' }}>
                <AudioPlayback source={previewUrl} />
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
