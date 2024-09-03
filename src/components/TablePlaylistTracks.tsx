'use client';

import { useState } from 'react';
import type { Track } from '@/src/types';
import { msToMin, sortObjectsByField as sortTracks } from '@/src/utils/functions';
import AudioPlayback from './AudioPlayback';
import styles from '@/src/styles/app.module.css';

type Props = { tracks: Track[] };

export default function TablePlaylistTracks({ tracks }: Props) {
  const [table, setTable] = useState<Track[]>(tracks);
  const [isAsc, setIsAsc] = useState<boolean>(null!);

  function handleSortTable(field: keyof Track) {
    if (!field) {
      setTable(tracks);
      setIsAsc(null!);
    } else {
      sortTracks<Track>(field, tracks, setTable, isAsc, setIsAsc);
    }
  }

  if (!table || !table.length) return;
  <div className={styles.paper}>
    <h2 className={styles.h2}>No tracks found</h2>;
  </div>;

  return (
    <article className={`${styles.article} ${styles.paper} ${styles.tableWrapper}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(table[0]).map(
              (objectKey) =>
                objectKey !== 'id' &&
                objectKey !== 'previewUrl' && (
                  <th key={objectKey}>
                    <button onClick={() => handleSortTable(objectKey as keyof Track)}>
                      {objectKey}
                      <div>
                        <span>&#x25B4;</span>
                        <span>&#x25BE;</span>
                      </div>
                    </button>
                  </th>
                ),
            )}
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {table.map(({ id, name, duration, artists, popularity, previewUrl }) => (
            <tr key={id}>
              <td>
                <strong>{name}</strong>
              </td>
              <td>{artists}</td>
              <td>{msToMin(duration)}</td>
              <td>{popularity}</td>
              <td style={{ display: 'flex' }}>
                <AudioPlayback source={previewUrl} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}