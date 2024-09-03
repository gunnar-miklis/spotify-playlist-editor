export type Playlist = {
  id: string;
  name: string;
  owner: string;
  visibility: boolean;
  totalTracks: number;
};

export type Track = {
  id: string;
  name: string;
  artists: string;
  duration: number;
  popularity: number;
  previewUrl: string;
};

// API Types
export type SpotifyDefaultResponse = {
  limit: number;
  offset: 0;
  next: string | null;
  previous: string | null;
  total: number;
};
export type SpotifyResponsePlaylists = SpotifyDefaultResponse & {
  items: {
    id: string;
    name: string;
    owner: { display_name: string };
    public: boolean;
    tracks: { total: number };
  }[];
};
export type SpotifyResponsePlaylistTracks = SpotifyDefaultResponse & {
  items: [
    {
      track: {
        id: string;
        name: string;
        artists: {
          id: string;
          name: string;
        }[];
        duration_ms: number;
        popularity: number;
        preview_url: string;
      };
    },
  ];
};
