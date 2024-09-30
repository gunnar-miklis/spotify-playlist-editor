'use server';

import type { AddItemsToPlaylistBody, CreatePlaylistBody } from '@/src/types';
import apiService from '@/src/utils/apiService';

/**
 * Creates a new playlist via the Spotify API and adds items to the created playlist.
 * @param userId The id of the user to create the playlist for.
 * @param metadata The metadata for the new playlist.
 * @param items The items (tracks/track uris) to add to the playlist.
 * @returns An object with a message indicating the success of the operation.
 */
export async function createPlaylist(
  userId: string,
  metadata: CreatePlaylistBody,
  items: AddItemsToPlaylistBody,
) {
  // create a new playlist via the Spotify API, then add items to it.
  const createdPlaylistId = await apiService.createPlaylist(userId, metadata);
  const result = await apiService.addItems(createdPlaylistId, items);
  return result;
}
