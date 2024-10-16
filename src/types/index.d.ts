// SECTION: General Types
export type ResultMessage = {
  message: 'success' | 'error';
};

export type DynamicHeadingType = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string | null;
};

export type NavLinkType = {
  text: string;
  href?: string;
};

export type SortingOrder = 'asc' | 'desc';

// SECTION: playlist/track related types used in the application
export type Playlist = {
  id: string;
  name: string;
  owner: string;
  visibility: boolean;
  totalTracks: number;
};
export type PlaylistProperties = Partial<keyof Playlist>;

export type Track = {
  id: string;
  uri: string;
  name: string;
  artists: string;
  duration: number;
  popularity: number;
  releaseDate: string;
  previewUrl: string;
  openSpotify: string;
  apiEndpoint: string;
};
export type TrackProperties = Partial<keyof Track>;
export type SortTracksBy = [TrackProperties, SortingOrder];

// SECTION: Types for the Spotify Api
/**
 * Excerpt of Spotif Api GET response
 */
export type SpotifyDefaultResponse = {
  limit: number;
  offset: 0;
  next: string | null;
  previous: string | null;
  total: number;
};
/**
 * Excerpt of Spotif Api GET response at endpoint: /me/playlists
 */
export type GetCurrentUsersPlaylists = SpotifyDefaultResponse & {
  items: {
    id: string;
    name: string;
    owner: { display_name: string };
    public: boolean;
    tracks: { total: number };
  }[];
};
/**
 * Excerpt of Spotif Api GET response at endpoint: /playlists/{playlist_id}/tracks
 */
export type GetPlaylistItems = SpotifyDefaultResponse & {
  items: {
    track: {
      id: string;
      uri: string;
      name: string;
      artists: {
        id: string;
        name: string;
      }[];
      duration_ms: number;
      popularity: number;
      album: {
        release_date: string;
      };
      preview_url: string;
      external_urls: {
        spotify: string;
      };
      href: string;
    };
  }[];
};
/**
 * Excerpt of Spotif Api POST request at endpoint: /users/{user_id}/playlists
 */
export type CreatePlaylistBody = {
  name: string;
  description?: string;
  public?: boolean;
};
/**
 * Excerpt of Spotif Api POST request at endpoint: /playlists/{playlist_id}/tracks
 */
export type AddItemsToPlaylistBody = {
  uris: string[];
  position?: number;
};
