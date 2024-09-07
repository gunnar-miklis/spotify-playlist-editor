import { auth } from '@/src/auth';
import type {
  AddItemsToPlaylistBody,
  CreatePlaylistBody,
  GetCurrentUsersPlaylists,
  GetPlaylistItems,
  Playlist,
  Track,
} from '@/src/types';

type HttpVerbs = 'GET' | 'POST';
type PostBody = CreatePlaylistBody | AddItemsToPlaylistBody;

/**
 * A simple interface that provides methods to interact with the Spotify API.
 * @throws errors if the request fails, or if the user is not authenticated.
 */
class ApiService {
  private _api;
  private _offset;
  private _limit;

  constructor() {
    this._api = async (method: HttpVerbs, endpoint: string, body?: PostBody) => {
      const session = await auth();
      if (!session) throw new Error('User not authenticated');

      return fetch(`https://api.spotify.com/v1${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });
    };
    this._offset = 0;
    this._limit = 20;
  }

  /**
   * Fetches all playlists for the current user, and returns an array of Playlist objects.
   * @returns An array of all playlists.
   */
  async getAllPlaylists() {
    try {
      const apiResponse = await this._api('GET', '/me/playlists');
      if (!apiResponse.ok) {
        throw new Error(
          `Failed to fetch playlists: ${apiResponse.status} ${apiResponse.statusText}`,
        );
      }

      // Pick only those properties (from data) which are needed in the application
      const data: GetCurrentUsersPlaylists = await apiResponse.json();
      const playlists: Playlist[] = data.items.map((i) => ({
        id: i.id,
        name: i.name,
        owner: i.owner.display_name,
        visibility: i.public,
        totalTracks: i.tracks.total,
      }));

      return playlists;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches a playlist by its id.
   * @param id The id of the playlist.
   * @returns A single playlist.
   */
  async getOnePlaylist(id: string) {
    try {
      const apiResponse = await this._api('GET', `/playlists/${id}`);
      if (!apiResponse.ok) {
        throw new Error(
          `Failed to fetch playlist: ${apiResponse.status} ${apiResponse.statusText}`,
        );
      }

      // Pick only those properties (from data) which are needed in the application
      const data = await apiResponse.json();
      const playlist: Playlist = {
        id: data.id,
        name: data.name,
        owner: data.owner.display_name,
        visibility: data.public,
        totalTracks: data.tracks.total,
      };

      return playlist;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches the tracks for a playlist by its id.
   * @param id The id of the playlist.
   * @returns An array of tracks.
   */
  async getPlaylistTracks(id: string) {
    try {
      const apiResponse = await this._api(
        'GET',
        `/playlists/${id}/tracks?offset=${this._offset}&limit=${this._limit}`,
      );
      if (!apiResponse.ok) {
        throw new Error(
          `Failed to fetch tracks for this playlist: ${apiResponse.status} ${apiResponse.statusText}`,
        );
      }

      // Pick only those properties (from data) which are needed in the application
      const data: GetPlaylistItems = await apiResponse.json();
      const playlistTracks: Track[] = data.items.map(({ track }) => ({
        id: track.id,
        uri: track.uri,
        name: track.name,
        artists: track.artists.map(({ name }) => name).join(', '),
        duration: track.duration_ms,
        popularity: track.popularity,
        releaseDate: track.album.release_date,
        previewUrl: track.preview_url,
        openSpotify: track.external_urls.spotify,
        apiEndpoint: track.href,
      }));

      return playlistTracks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new playlist.
   * @param userId The id of the user to create the playlist for.
   * @param metadata The metadata for the new playlist.
   * @returns The id of the created playlist.
   */
  async createPlaylist(userId: string, metadata: CreatePlaylistBody) {
    try {
      // Validate inputs before making the api call
      if (!userId) {
        throw new Error('Failed to create a new playlist: "userId" is missing.');
      }
      if (!metadata) {
        throw new Error('Failed to create a new playlist: "metadata-object" is missing.');
      }

      const apiResponse = await this._api('POST', `/users/${userId}/playlists`, metadata);
      if (!apiResponse.ok) {
        throw new Error(
          `Failed to create a new playlist: ${apiResponse.status} ${apiResponse.statusText}`,
        );
      }

      const data = await apiResponse.json();
      if (!data) throw new Error('Unexpected Error. data-object is empty.');

      const createdPlaylistId: string = data.id;
      return createdPlaylistId;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Adds tracks to an existing playlist.
   * @param playlistId The id of the playlist to add tracks to.
   * @param items The items (tracks/track uris) to add to the playlist.
   * @returns An object with a message indicating the success of the operation.
   */
  async addItems(playlistId: string, items: AddItemsToPlaylistBody) {
    try {
      // Validate inputs before making the api call
      if (!playlistId) {
        throw new Error('Failed to create a new playlist: "playlistId" is missing.');
      }
      if (!items) {
        throw new Error('Failed to create a new playlist: "items-object" is missing.');
      }
      if (!items.uris.length) {
        throw new Error(
          'Failed to create a new playlist: "items-object" must contain at least one "URI".',
        );
      }
      if (items.uris.length > 100) {
        throw new Error('Api limit does not allow to add more than 100 tracks at once.');
      }

      const apiResponse = await this._api('POST', `/playlists/${playlistId}/tracks`, items);
      if (!apiResponse.ok) {
        throw new Error(
          `Failed to add tracks to the newly created playlist: ${apiResponse.status} ${apiResponse.statusText}`,
        );
      }

      const data = await apiResponse.json();
      if (!data) throw new Error('Unexpected Error. data-object is empty.');

      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }
}

/**
 * A simple interface that provides methods to interact with the Spotify API.
 * @throws errors if the request fails, or if the user is not authenticated.
 */
const apiService = new ApiService();
export default apiService;
