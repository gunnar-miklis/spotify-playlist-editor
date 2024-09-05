'use server';

import type { AddItemsToPlaylistBody, CreatePlaylistBody } from '@/src/types';
import apiService from '@/src/utils/apiService';

export async function createPlaylist(
  userId: string,
  metadata: CreatePlaylistBody,
  items: AddItemsToPlaylistBody,
) {
  const createdPlaylistId = await apiService.createPlaylist(userId, metadata);
  const result = await apiService.addItems(createdPlaylistId, items);
  return result;
}
