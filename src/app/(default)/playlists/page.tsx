import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import AppWrapper from '@/src/components/layout/wrappers/AppWrapper/AppWrapper';
import TableAllPlaylists from '@/src/components/playlists/TableAllPlaylists';
import type { DynamicHeadingType, NavLinkType } from '@/src/types';
import apiService from '@/src/utils/apiService';

const title = 'Playlists';
const heading: DynamicHeadingType = {
  level: 1,
  text: title,
};
const navLink: NavLinkType = {
  text: 'Go back',
};
export const metadata: Metadata = { title };

export default async function AllPlaylists() {
  const playlists = await apiService.getAllPlaylists();

  if (playlists.length) {
    return (
      <Layout>
        <TableAllPlaylists playlists={playlists} />
      </Layout>
    );
  }

  return (
    <Layout>
      <strong className='strong'>No Playlist found</strong>
    </Layout>
  );
}

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <AppWrapper heading={heading} navLink={navLink}>
      <section className='section' id='playlists'>
        {children}
      </section>
    </AppWrapper>
  );
}
