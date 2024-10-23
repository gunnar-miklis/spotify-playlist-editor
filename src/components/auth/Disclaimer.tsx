import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function Disclaimer({ className }: Props) {
  return (
    <div className={`flx-cl gp-sm ${className}`}>
      <strong className='strong'>Privacy & OAuth Information</strong>
      <small className='small'>
        OAuth is used to securely authenticate your session. This
        industry-standard protocol allows you to log in safely without sharing
        your password. When you log in, you are redirected to Spotify&apos;s
        login page, where you control which permissions to grant. Only the data
        you agree to share, such as{' '}
        <em>&quot;accessing your profile details&quot;</em> and
        <em>&quot;modifying your playlists&quot;</em>, is used while you&apos;re
        logged in (you can remove this access at any time in your spotify
        account settings). A secure access token containing this data is
        temporarily saved in your browser. Once you log out, this token and any
        associated data are deleted. No personal details are stored.
      </small>
    </div>
  );
}
