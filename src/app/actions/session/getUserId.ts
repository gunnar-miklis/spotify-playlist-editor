'use server';

import { auth } from '@/src/auth';

export async function getUserId() {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error(
      'User not properly authenticated. Try logout and login again.',
    );

  return session.user.id;
}
