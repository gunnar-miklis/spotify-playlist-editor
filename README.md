# Spotify Playlist Assistant (Prototype)

Spotify Playlist Assistant is a simple interface that provides methods to interact with the Spotify API. It allows you to fetch playlists and their tracks, filter the lists, and create new playlists based on the selected filters.

&nbsp;

<div align='center' >

### [**>> Try it out! <<**](https://spotify-playlist-assistant.vercel.app/)

</div>

&nbsp;

![Screenshot](/public/screenshot.webp)

&nbsp;

## Features

1. **Fetch** playlists and tracks from the Spotify API.
2. **Filter** playlists based on selected criteria.
3. **Create** new playlists and send them back to the Spotify API.
4. Light/Dark mode.

## Technologies and Frameworks

- TypeScript
- Next.js / React
- Next-Auth (**OAuth** with Auth.js)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)

## Installation

1. Clone the repository: `git clone https://github.com/gunnar-miklis/spotify-playlist-assistant.git`.
2. Install dependencies: `yarn install` or `npm install`.
3. Create a `.env` file and add the following environment variables:
   - `AUTH_SECRET` (auto-generate via `npx auth secret`).
   - `AUTH_SPOTIFY_ID` (Spotify API client ID) and `AUTH_SPOTIFY_SECRET` (Spotify API client secret): follow this doc to connect to your application and generate those values: [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/concepts/apps).

## Usage

1. Start the development server: `yarn dev` or `npm run dev`.
2. Open your browser and visit `http://localhost:3000`.
3. Sign in with your Spotify account via OAuth.
4. Explore the features and filters to create your new playlists.

## Project Structure

The project structure is as follows:

```bash
src/
├── app
│   ├── (default)
│   │   └── playlists
│   │       ├── [id]/page.tsx
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── actions
│   │   ├── playlists/createPlaylist.ts
│   │   └── session/getUserId.ts
│   ├── api/auth/[...nextauth]/route.ts
│   ├── error.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components
│   ├── auth/...
│   ├── common/...
│   ├── playlist/...
│   └── playlists/...
├── styles
│   ├── app.module.css
│   └── global.css
├── utils
│   ├── apiService.ts
│   └── functions.ts
├── types/...
├── auth.ts
└── middleware.ts
```

## Motivation

- This project is on the one hand an educational learning project to help me expand my development skills (SSR and CSR with Next.js and TypeScript).
- And on the other hand, it's a fun hobby project. I've always wanted better filtering options for playlists in Spotify, but since they don't offer that feature, I decided to build it myself.
- It's a mix of learning something new and solving a problem I've personally wanted fixed for a while.

## Future Ideas

- Add more filters.
  - this needs extra Api calls, since the cool filters ("dancebility", "loudness", "energetic", etc.) need an api call for EACH track.
- Pagination: lazy/auto loading.
- Style the OAuth redirect page.
- Allow the user to make new created playlist public.
  - Prompt when creating playlist: "Do you want to share this playlist with everyone?"
  - Database will store the information (use Prisma ORM).
  - Playlist page will be splitted into "Private playlist" and "Public playist".

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
