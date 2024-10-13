import Link from 'next/link';
import type { User } from 'next-auth';

import Avatar, { AvatarImage } from '@/src/components/common/Avatar/Avatar';
import Paper from '@/src/components/layout/wrappers/Paper/Paper';

type Props = User;

export default function User({ name, image }: Props) {
  if (!name) throw new Error('User is not authenticated');

  return (
    <>
      <Paper className='flx-rw flx-btw'>
        <h2 className='h2'>Hello {name} !</h2>
        <Avatar>
          <AvatarImage userName={name} userImage={image} />
        </Avatar>
      </Paper>

      <Link className='button button--full-width' href='/playlists'>
        View Playlists
      </Link>
    </>
  );
}
