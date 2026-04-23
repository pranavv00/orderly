import { cookies } from "next/headers";

// ── Types ──
export interface AuthSession {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  expiresAt: number;
}

// ── Config ──
const COOKIE_NAME = "orderly_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// In production, this would be your real OAuth provider's token endpoint
const TOKEN_ENDPOINT =
  process.env.OAUTH_TOKEN_URL || "https://api.example.com/oauth/token";
const CLIENT_ID = process.env.OAUTH_CLIENT_ID || "orderly_mock_client";
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || "orderly_mock_secret";
const REDIRECT_URI =
  process.env.OAUTH_REDIRECT_URI || "http://localhost:3000/auth/callback";

// ── Mock Token Exchange ──
// Simulates what your real backend would return.
// Replace this with a real fetch() to your OAuth provider in production.
export async function exchangeCodeForToken(
  code: string
): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 800));

  // In production, uncomment this:
  // const res = await fetch(TOKEN_ENDPOINT, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     grant_type: "authorization_code",
  //     code,
  //     client_id: CLIENT_ID,
  //     client_secret: CLIENT_SECRET,
  //     redirect_uri: REDIRECT_URI,
  //   }),
  // });
  //
  // if (!res.ok) {
  //   const err = await res.json().catch(() => ({}));
  //   throw new Error(err.error_description || "Token exchange failed");
  // }
  //
  // return res.json();

  // Mock response
  if (code === "INVALID_CODE") {
    throw new Error("Invalid authorization code");
  }

  return {
    accessToken: `mock_at_${code}_${Date.now()}`,
    refreshToken: `mock_rt_${code}_${Date.now()}`,
    expiresIn: 3600,
  };
}

// ── Mock User Info Fetch ──
export async function fetchUserInfo(
  accessToken: string
): Promise<AuthSession["user"]> {
  await new Promise((r) => setTimeout(r, 300));

  // In production:
  // const res = await fetch("https://api.example.com/me", {
  //   headers: { Authorization: `Bearer ${accessToken}` },
  // });
  // if (!res.ok) throw new Error("Failed to fetch user info");
  // return res.json();

  return {
    id: "usr_" + Math.random().toString(36).slice(2, 10),
    name: "Pranav Gawande",
    email: "pranav@orderly.app",
    avatar: undefined,
  };
}

// ── Session Management ──

export async function createSession(session: AuthSession): Promise<void> {
  const cookieStore = await cookies();
  // Encrypt in production — for now, base64 encode the non-sensitive parts
  const payload = JSON.stringify({
    user: session.user,
    expiresAt: session.expiresAt,
    // NEVER store the raw access token in the cookie sent to client.
    // Store it server-side (Redis/DB) keyed by a session ID.
    // For this mock, we store a session reference only.
    sessionId: "sess_" + Math.random().toString(36).slice(2, 14),
  });

  cookieStore.set(COOKIE_NAME, Buffer.from(payload).toString("base64"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function getSession(): Promise<{
  user: AuthSession["user"];
  sessionId: string;
} | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64").toString());
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      // Session expired
      await destroySession();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
