import type { Metadata } from 'next';

import { auth } from '@/src/auth';
import SignIn from '@/src/components/auth/SignIn';
import SignOut from '@/src/components/auth/SignOut';
import User from '@/src/components/auth/User';
import AppWrapper from '@/src/components/layout/wrappers/AppWrapper/AppWrapper';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';
import type { DynamicHeadingType } from '@/src/types';

const title = 'Spotify Playlist Assistant';
const heading: DynamicHeadingType = {
  level: 1,
  text: title,
};
export const metadata: Metadata = { title };

export default async function RootPage() {
  const session = await auth();

  if (session) {
    return (
      <AppWrapper heading={heading}>
        <section id='user' className='section'>
          <Paper className='flx-cl'>
            <User {...session.user} />
          </Paper>
          <Paper>
            <SignOut />
          </Paper>
        </section>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper heading={heading}>
      <section id='user' className='section'>
        <Paper>
          <h2 className='h2'>Login</h2>
        </Paper>
        <Paper>
          <SignIn />
        </Paper>
      </section>
    </AppWrapper>
  );
}
