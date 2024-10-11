'use client';

import Link from 'next/link';

import Table, {
  TableBody,
  TableHeader,
} from '@/src/components/layout/Table/Table';
import styles from '@/src/components/layout/Table/table.module.css';
import useTable from '@/src/components/layout/Table/useTable';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import AudioPlayback from '@/src/components/playlist/AudioPlayback/AudioPlayback';
import type { Track, TrackProperties } from '@/src/types';
import { msToMin } from '@/src/utils/functions';

const propertiesToDisplay = [
  'name',
  'duration',
  'artists',
  'releaseDate',
  'popularity',
] satisfies TrackProperties[];

type Props = { tracks: Track[] };

export default function Tracks({ tracks }: Props) {
  const { table, handleSortTable } = useTable(tracks);

  if (!table || !table.length) return;
  <Paper>
    <h2 className='h2'>No tracks found</h2>;
  </Paper>;

  return (
    <Table>
      <TableHeader
        tableEntry={table[0]}
        handleSortTable={handleSortTable}
        propertiesToDisplay={propertiesToDisplay}
      >
        <th>{'Preview'.toUpperCase()}</th>
      </TableHeader>

      <TableBody>
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
              <td className={styles['table__cell']} style={{ display: 'flex' }}>
                <AudioPlayback source={previewUrl} />
              </td>
            </tr>
          ),
        )}
      </TableBody>
    </Table>
  );
}
