import styles from '@/src/styles/app.module.css';

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
    <dl className={styles.dl}>
      <span>
        <dt>Owner: </dt>
        <dd>{owner}</dd>
      </span>
      <span> | </span>
      <span>
        <dt>Visibility: </dt>
        <dd>{visibility ? 'Public' : 'Private'}</dd>
      </span>
      <span> | </span>
      <span>
        <dt>Total Tracks: </dt>
        <dd>{totalTracks}</dd>
      </span>
    </dl>
  );
}
