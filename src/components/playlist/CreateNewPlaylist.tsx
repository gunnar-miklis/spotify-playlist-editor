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

      const userId = await getUserId();

      const metadata: CreatePlaylistBody = {
        name: playlist.name + ' (filtered)',
        public: playlist.visibility,
        description: 'Playlist filtered by "Spotify Filter Assistant"',
      };
      const items: AddItemsToPlaylistBody = {
        uris: filteredTracks.map(({ uri }) => uri),
        position: 0,
      };

      const result = await createPlaylist(userId, metadata, items);

      if (result.message === 'success') {
        setIsCreatedSucessful(true);
        const timer = setTimeout(() => {
          setIsCreatedSucessful(false);
          clearTimeout(timer);
        }, 2000);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };
  return (
    <article className={`${styles.article} ${styles.paper}`}>
      <strong>Create a new playlist</strong>{' '}
      <p>
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
