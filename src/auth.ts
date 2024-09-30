import NextAuth from 'next-auth';
import Spotify from 'next-auth/providers/spotify';

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    accessToken?: string;
  }
}

const scope = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
].join(' ');

const oAuthConfig = {
  authorization: `https://accounts.spotify.com/authorize?scope=${scope}`,
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Spotify(oAuthConfig)],
  callbacks: {
    jwt({ token, account }) {
      if (account && account.token_type === 'bearer') {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken;
      }
      if (typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
