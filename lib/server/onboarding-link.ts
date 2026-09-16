/**
 * Public share link for a pre-launch form. Now that the API lives inside the
 * Next.js app, this resolves against the site's own origin.
 */
export function onboardingShareLink(token: string): string {
  const base =
    process.env.CLIENT_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000';
  return `${base.replace(/\/$/, '')}/onboarding/${token}`;
}
