import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import styles from '@/src/components/playlist/PlaylistMetadata/playlist-metadata.module.css';

type Props = {
  owner: string;
  visibility: boolean;
  totalTracks: number;
};

export default function PlaylistMetadata({
  owner,
  visibility,
  totalTracks,
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
          <dt>Total Tracks: </dt>
          <dd className={styles['list__item--bold']}>{totalTracks}</dd>
        </span>
      </dl>
    </Paper>
  );
}
