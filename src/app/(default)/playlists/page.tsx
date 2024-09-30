import type { Metadata } from 'next';

import MainWrapper from '@/src/components/layout/MainWrapper';
import TableAllPlaylists from '@/src/components/playlists/TableAllPlaylists';
import styles from '@/src/styles/app.module.css';
import apiService from '@/src/utils/apiService';

export default async function AllPlaylists() {
  const playlists = await apiService.getAllPlaylists();

  if (playlists.length) {
    return (
      <MainWrapper headerLevel={1} headerText={title} navLink='Go back'>
        <section
          id='playlists'
          className={`${styles.section} ${styles['table-wrapper']} ${styles.paper}`}
        >
          <TableAllPlaylists playlists={playlists} />
        </section>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper headerLevel={1} headerText={title} navLink='Go back'>
      <div className={styles.paper}>
        <strong className={styles.p}>No found</strong>
      </div>
    </MainWrapper>
  );
}

const title = 'Playlists';
export const metadata: Metadata = {
  title,
  description: "Current User's Playlists",
};
