import { NextResponse } from "next/server";
import { getSession, destroySession } from "@/lib/auth";

/**
 * GET /api/auth/session
 * Returns the current session (user info only, no tokens).
 */
export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: session.user,
    sessionId: session.sessionId,
  });
}

/**
 * DELETE /api/auth/session
 * Destroys the session (logout).
 */
export async function DELETE() {
  await destroySession();
  return NextResponse.json({ success: true });
}
