# Playlist Editor (for Spotify)*

**\*under development 🏗️**

Playlist Editor (for Spotify) is a simple tool to edit and manage playlists, utilizing the Spotify API. Users can filter, sort, randomize track order and create new playlists. The interface offers a light and a dark theme, and offers responsiveness across devices.

&nbsp;

<div align='center'>

### [**>> Try it out <<**](https://playlist-editor-for-spotify.vercel.app)

</div>

&nbsp;

![Screenshot of the prototype](https://res.cloudinary.com/dyrcsywk9/image/upload/v1729355211/playlist-editor-for-spotify-laptop.webp)

&nbsp;

## 🚀 Features

1. **Fetch** user specific playlists from the Spotify API.
2. **Filter** playlists based on selected criteria.
3. **Sort** playlists based on selected criteria.
4. **Randomize** the playlists track order.
5. **Create** new playlists for the users account, after applying refinements.
6. **Theming** Light/Dark mode.

## 🛠️ Technologies and Frameworks

- TypeScript
- Next.js / React
- Next-Auth (**OAuth** with Auth.js)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)

## 📦 Installation

1. Clone the repository: `git clone https://github.com/gunnar-miklis/spotify-playlist-assistant-v1.git`.
2. Install dependencies: `yarn` or `npm install`.
3. Create a Client App on the Spotify Web API website.
    - Follow this doc ([Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/concepts/apps)) to create your application and generate the app credentials (CLIENT_ID and CLIENT_SECRET).
    - Set `Redirect URIs` to `http://localhost:3000/api/auth/callback/spotify`.
4. Create a `.env` file and add the following environment variables:
    - `AUTH_SECRET`: auto-generate via `npx auth secret`.
    - `AUTH_SPOTIFY_ID` (Spotify Web API CLIENT_ID).
    - `AUTH_SPOTIFY_SECRET` (Spotify Web API CLIENT_SECRET).

## 🖥️ Usage

1. Start the development server: `yarn dev` or `npm run dev`.
2. Open your browser and visit `http://localhost:3000`.
3. Sign in with your Spotify account via OAuth.
4. Explore the features and filters to create your new playlists.

## 🗂️ Project Structure

The project structure is as follows:

```bash
src/
├── app
│   ├── (default)
│   │   └── playlists
│   │       ├── [id]/page.tsx
│   │       ├── page.tsx
│   │       └── layout.tsx
│   ├── actions
│   │   ├── playlists/createPlaylist.ts
│   │   └── session/getUserId.ts
│   ├── api/auth/[...nextauth]/route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── error.tsx
├── components
│   ├── auth/...
│   ├── common/...
│   ├── layout/...
│   ├── playlist/...
│   └── playlists/...
├── styles
│   ├── main.css
│   ├── app.css
│   ├── globals.css
│   ├── reset.css
│   ├── utils.css
│   └── variables.css
├── utils
│   ├── apiService.ts
│   └── functions.ts
├── types
│   └── index.d.ts
├── auth.ts
└── middleware.ts
```

## ✨ Motivation

- This project is on the one hand an educational learning project to help me expand my development skills (Next.js, TypeScript, SSR/CSR, Authentication, Handle complex API data, Caching, Pagination, Modularity, SOLID principles).
- And on the other hand, it's a fun hobby project. I've always wanted better filtering/editing options for playlists in Spotify, but since they don't offer that feature, I decided to build it myself.
- It's a mix of learning something new and solving a problem I've personally wanted fixed for a while.

## 💭 Future Ideas

- ~~Sort playlists.~~
- ~~Randomize playlists.~~
- Batch editing:
  - merge playlists.
  - delete playlists.
  - select and remove tracks from playlist.
- Paste playlist link to access public playlists that are not stored in the users profile.
- Basic analytics for playlists:
  - ~~total tracks~~.
  - total duration.
  - frequent genres.
  - frequent artists.
- Add more filters (might require several additional api fetches):
  - genre => fetch each artist.
  - tempo, mood ("dancebility", "loudness", "energetic", etc.) => fetch each track.
- Caching: genres, track details, etc.
- Pagination: lazy/auto loading.
- Style the OAuth redirect page.
- Sharing Playlists:
  - Shareable link.
  - Allow users to make newly created playlists public available for everyone.
    - Prompt when creating playlist: "Do you want to share this playlist?"
    - Playlist will be saved in separate database (use Prisma ORM).
    - Idea: "Playlist page" might be splitted into "Private playlist" and "Public playist".

## 🤝 Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, feel free to message me 🙂

## 📜 License

This project is licensed under the MIT License.
