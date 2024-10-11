'use client';

import Link from 'next/link';

import Table, {
  TableBody,
  TableHeader,
} from '@/src/components/layout/Table/Table';
import styles from '@/src/components/layout/Table/table.module.css';
import useTable from '@/src/components/layout/Table/useTable';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import type { Playlist, PlaylistProperties } from '@/src/types';

const propertiesToDisplay = [
  'name',
  'visibility',
  'totalTracks',
  'owner',
] satisfies PlaylistProperties[];

type Props = { playlists: Playlist[] };

export default function Playlists({ playlists }: Props) {
  const { table, handleSortTable } = useTable(playlists);

  if (!table || !table.length) return;
  <Paper>
    <h2 className='h2'>No playlists found</h2>;
  </Paper>;

  return (
    <Table>
      <TableHeader
        tableEntry={table[0]}
        handleSortTable={handleSortTable}
        propertiesToDisplay={propertiesToDisplay}
      />

      <TableBody>
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
      </TableBody>
    </Table>
  );
}
