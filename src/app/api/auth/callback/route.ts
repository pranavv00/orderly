import { NextRequest, NextResponse } from "next/server";
import {
  exchangeCodeForToken,
  fetchUserInfo,
  createSession,
} from "@/lib/auth";

/**
 * POST /api/auth/callback
 *
 * Server-side handler that:
 * 1. Receives the authorization code from the client
 * 2. Exchanges it for tokens (server-to-server, secrets never leave the server)
 * 3. Fetches user info using the access token
 * 4. Creates an HTTP-only session cookie
 * 5. Returns success (client then redirects to dashboard)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, state } = body;

    // ── Validate ──
    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing authorization code" },
        { status: 400 }
      );
    }

    // In production, validate `state` against a stored CSRF token:
    // const storedState = req.cookies.get("oauth_state")?.value;
    // if (state !== storedState) {
    //   return NextResponse.json({ error: "Invalid state" }, { status: 403 });
    // }

    // ── Exchange code for tokens (server-to-server) ──
    const tokens = await exchangeCodeForToken(code);

    // ── Fetch user info ──
    const user = await fetchUserInfo(tokens.accessToken);

    // ── Create session ──
    await createSession({
      accessToken: tokens.accessToken, // stored server-side only
      user,
      expiresAt: Date.now() + tokens.expiresIn * 1000,
    });

    // ── Return success (no tokens exposed to client) ──
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: unknown) {
    console.error("[auth/callback] Error:", err);
    const message =
      err instanceof Error ? err.message : "Authentication failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
