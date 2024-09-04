'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Playlist } from '@/src/types';
import { sortObjectsByField as sortPlaylists } from '@/src/utils/functions';
import styles from '@/src/styles/app.module.css';

type Props = { playlists: Playlist[] };

export default function TableAllPlaylists({ playlists }: Props) {
  const [table, setTable] = useState<Playlist[]>(playlists);
  const [isAsc, setIsAsc] = useState<boolean>(null!);

  function handleSortTable(field: keyof Playlist) {
    if (!field) {
      setTable(playlists);
      setIsAsc(null!);
    } else {
      sortPlaylists<Playlist>(field, playlists, setTable, isAsc, setIsAsc);
    }
  }

  if (!table || !table.length) return;
  <div className={styles.paper}>
    <h2 className={styles.h2}>No playlists found</h2>;
  </div>;

  return (
    <article className={`${styles.article} ${styles.paper} ${styles['table-wrapper']}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(table[0]).map(
              (objectKey) =>
                objectKey !== 'id' && (
                  <th key={objectKey}>
                    <button onClick={() => handleSortTable(objectKey as keyof Playlist)}>
                      {objectKey}
                      <div>
                        <span>&#x25B4;</span>
                        <span>&#x25BE;</span>
                      </div>
                    </button>
                  </th>
                ),
            )}
          </tr>
        </thead>
        <tbody>
          {table.map(({ id, name, visibility, totalTracks, owner }) => (
            <tr key={id}>
              <td>
                <Link className={styles.link} href={`/playlists/${id}`}>
                  {name}
                </Link>
              </td>
              <td>{owner}</td>
              <td>{visibility ? 'public' : 'private'}</td>
              <td>{totalTracks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
