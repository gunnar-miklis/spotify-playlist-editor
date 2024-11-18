'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import { MdOutlineCheckCircle } from 'react-icons/md';

import { createPlaylist } from '@/src/app/actions/playlists/createPlaylist';
import { getUserId } from '@/src/app/actions/session/getUserId';
import InlineSpinner from '@/src/components/common/InlineSpinner/InlineSpinner';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import styles from '@/src/components/playlist/FilterPanel/filter-panel.module.css';
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
  const [currentUrl, setCurrentUrl] = useState('');

  const pathname = usePathname();

  useEffect(() => {
    const url = `https://spotify-playlist-assistant.vercel.app${pathname}`;
    setCurrentUrl(url);
  }, [pathname]);

  const handleCreatePlaylist = async () => {
    try {
      setIsLoading(true);

      // collect data (userId, metadata, items)
      const userId = await getUserId();

      const metadata: CreatePlaylistBody = {
        name: `${playlist.name} (${new Date().toLocaleString('en-GB')})`,
        description: `Playlist modified by "Playlist Editor (for Spotify)". To adjust your edits, visit: ${currentUrl}`,
        public: playlist.visibility, // FIXME: the public/private attritubte is not being passed correctly
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

  // SECTION: Render
  if (isLoading) {
    return (
      <Layout>
        <button className='button button--wait' disabled>
          <InlineSpinner />
        </button>
      </Layout>
    );
  }

  if (isCreatedSuccessful) {
    return (
      <Layout>
        <button className='button button--wait' disabled>
          Successful <MdOutlineCheckCircle className='button__success-icon' />
        </button>
      </Layout>
    );
  }

  return (
    <Layout>
      <button className='button' onClick={handleCreatePlaylist}>
        Create Playlist
      </button>
    </Layout>
  );
}

// SECTION: Layout
type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Paper className={`${styles['filter-item']} flx-cl`}>
      <div className={`${styles['filter-item__header']}`}>
        <strong className={`strong ${styles['filter-item__title']}`}>
          Create a new playlist
        </strong>
      </div>

      <div className={`${styles['filter-item__body']} flx-cl gp-sm`}>
        <p className='p'>
          {/* FIXME: include sorting as well, as of now it doesn't include sorting */}
          It&apos;ll create a copy of this playlist based on selected filters
          and sorting.
        </p>
        {children}
      </div>
    </Paper>
  );
}
