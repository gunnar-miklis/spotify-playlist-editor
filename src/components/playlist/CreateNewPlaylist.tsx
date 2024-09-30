'use client';

import { useState } from 'react';
import { MdOutlineCheckCircle } from 'react-icons/md';

import { createPlaylist } from '@/src/app/actions/playlists/createPlaylist';
import { getUserId } from '@/src/app/actions/session/getUserId';
import styles from '@/src/styles/app.module.css';
import type {
  AddItemsToPlaylistBody,
  CreatePlaylistBody,
  Playlist,
  Track,
} from '@/src/types';

type Props = {
  playlist: Playlist;
  filteredTracks: Track[];
};

export default function CreateNewPlaylist({ playlist, filteredTracks }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatedSuccessful, setIsCreatedSucessful] = useState(false);

  const handleCreatePlaylist = async () => {
    try {
      setIsLoading(true);

      // collect data (userId, metadata, items)
      const userId = await getUserId();

      const metadata: CreatePlaylistBody = {
        name: playlist.name + ' (filtered)',
        public: playlist.visibility ?? false,
        description: 'Playlist filtered by "Spotify Filter Assistant"',
      };

      const items: AddItemsToPlaylistBody = {
        uris: filteredTracks.map(({ uri }) => uri),
        position: 0,
      };

      // create playlist via Spotify API
      const result = await createPlaylist(userId, metadata, items);

      // visual feedback: show success button for 2 seconds.
      if (result.message === 'success') {
        setIsCreatedSucessful(true);
        setTimeout(() => setIsCreatedSucessful(false), 2000);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className={`${styles.article} ${styles.paper}`}>
      <strong>Create a new playlist</strong>{' '}
      <p>
        {/* FIXME: include sorting as well, as of now it doesn't include sorting */}
        It&apos;ll create a copy of this playlist based on selected filters and
        current sorting.
      </p>
      {isCreatedSuccessful ? (
        <button className={styles.button} disabled>
          Successful <MdOutlineCheckCircle className={styles.icon} />
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={handleCreatePlaylist}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className={styles.spinner}></div>
          ) : (
            <span>Create Playlist</span>
          )}
        </button>
      )}
    </article>
  );
}
