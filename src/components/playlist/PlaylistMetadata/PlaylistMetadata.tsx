import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import styles from '@/src/components/playlist/PlaylistMetadata/playlist-metadata.module.css';
import type { Playlist } from '@/src/types';
import { msToMin } from '@/src/utils/functions';

type Props = Playlist;

export default function PlaylistMetadata({
  owner,
  visibility,
  totalTracks,
  totalDuration,
}: Props) {
  return (
    <Paper>
      <dl className={styles['list']}>
        <span className={styles['list__item']}>
          <dt>Owner: </dt>
          <dd className={styles['list__item--bold']}>{owner}</dd>
        </span>
        <span className={styles['list__separator']}> | </span>
        <span className={styles['list__item']}>
          <dt>Visibility: </dt>
          <dd className={styles['list__item--bold']}>
            {visibility ? 'Public' : 'Private'}
          </dd>
        </span>
        <span className={styles['list__separator']}> | </span>
        <span className={styles['list__item']}>
          <dt>Tracks: </dt>
          <dd className={styles['list__item--bold']}>{totalTracks}</dd>
        </span>
        {totalDuration && (
          <>
            <span className={styles['list__separator']}> | </span>
            <span className={styles['list__item']}>
              <dt>Duration: </dt>
              <dd className={styles['list__item--bold']}>
                {msToMin(totalDuration)}
              </dd>
            </span>
          </>
        )}
      </dl>
    </Paper>
  );
}
