import { auth } from '@/src/auth';
import type {
  Playlist,
  SpotifyDefaultResponse,
  SpotifyResponsePlaylists,
  SpotifyResponsePlaylistTracks,
  Track,
} from '@/src/types';

const offset = 0;
const limit = 20;

class ApiService {
  private _api;

  constructor() {
    this._api = async (endpoint: string) => {
      const session = await auth();
      if (!session) throw new Error('User not authenticated');

      return fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
    };
  }

  async getAllPlaylists() {
    try {
      const apiResponse = await this._api('/me/playlists');
      if (!apiResponse.ok) {
        throw new Error(
          `Failed to fetch playlists: ${apiResponse.status} ${apiResponse.statusText}`,
        );
      }
      const data: SpotifyResponsePlaylists = await apiResponse.json();
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

  async getOnePlaylist(id: string) {
    try {
      const apiResponse = await this._api(`/playlists/${id}`);
      if (!apiResponse.ok) {
        throw new Error(
          `Failed to fetch playlist: ${apiResponse.status} ${apiResponse.statusText}`,
        );
      }
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

  async getPlaylistTracks(id: string) {
    try {
      const apiResponse = await this._api(
        `/playlists/${id}/tracks?offset=${offset}&limit=${limit}`,
      );
      if (!apiResponse.ok) {
        throw new Error(
          `Failed to fetch tracks for this playlist: ${apiResponse.status} ${apiResponse.statusText}`,
        );
      }
      const data: SpotifyResponsePlaylistTracks = await apiResponse.json();
      const playlistTracks: Track[] = data.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map(({ name }) => name).join(', '),
        duration: track.duration_ms,
        popularity: track.popularity,
        previewUrl: track.preview_url,
      }));
      return playlistTracks;
    } catch (error) {
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;
