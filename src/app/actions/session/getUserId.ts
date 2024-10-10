'use server';

import { auth } from '@/src/auth';

/**
 * Gets the user id from the session.
 *
 * @returns The user id.
 * @throws Error if the user is not authenticated.
 */
export async function getUserId() {
  const session = await auth();

  if (!session || !session.user || !session.user.id)
    throw new Error('User is not authenticated');

  return session.user.id;
}
