const ACCESS_KEY = 'kazi_access_token';
const REFRESH_KEY = 'kazi_refresh_token';

// ── Cookie helpers ─────────────────────────────────────────────────────────

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === 'undefined') return;
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Strict${secure}`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Max-Age=0; Path=/`;
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getToken(): string | null {
  return getCookie(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return getCookie(REFRESH_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  setCookie(ACCESS_KEY, accessToken, 60 * 60);        // 1 hour
  setCookie(REFRESH_KEY, refreshToken, 7 * 24 * 60 * 60); // 7 days
}

export function clearTokens(): void {
  deleteCookie(ACCESS_KEY);
  deleteCookie(REFRESH_KEY);
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export function isAuthenticated(): boolean {
  const token = getToken();
  return !!token && !isTokenExpired(token);
}

export function hasValidRefreshToken(): boolean {
  const token = getRefreshToken();
  return !!token && !isTokenExpired(token);
}
