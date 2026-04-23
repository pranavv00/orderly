"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

// ── Types ──
type CallbackState =
  | { status: "loading"; message: string }
  | { status: "success"; user: { name: string; email: string } }
  | { status: "error"; message: string; retryable: boolean };

// ── Inner Component (needs useSearchParams inside Suspense) ──
function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<CallbackState>({
    status: "loading",
    message: "Connecting to your account...",
  });
  const hasExchanged = useRef(false);

  const code = searchParams.get("code");
  const oauthState = searchParams.get("state");

  const exchangeCode = useCallback(async () => {
    // ── Step 1: Validate code exists ──
    if (!code) {
      setState({
        status: "error",
        message: "Authorization code is missing. Please try logging in again.",
        retryable: false,
      });
      return;
    }

    setState({ status: "loading", message: "Exchanging authorization..." });

    try {
      // ── Step 2: Send code to OUR server API route ──
      // The server handles the actual token exchange with the OAuth provider.
      // The access token never touches this client-side code.
      const res = await fetch("/api/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, state: oauthState }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server returned ${res.status}`);
      }

      // ── Step 3: Success — show briefly, then redirect ──
      setState({
        status: "success",
        user: data.user,
      });

      // Redirect to dashboard after a brief success animation
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Authentication failed";
      setState({
        status: "error",
        message,
        retryable: true,
      });
    }
  }, [code, oauthState, router]);

  useEffect(() => {
    // Prevent double-execution in React Strict Mode
    if (hasExchanged.current) return;
    hasExchanged.current = true;
    exchangeCode();
  }, [exchangeCode]);

  const handleRetry = () => {
    hasExchanged.current = false;
    exchangeCode();
  };

  const handleBackToLogin = () => {
    router.replace("/");
  };

  return (
    <div className="auth-callback-container">
      <div className="auth-callback-card">
        {/* Logo */}
        <div className="auth-logo">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
            <line x1="6" y1="17" x2="18" y2="17" />
          </svg>
        </div>
        <div className="auth-brand">Orderly</div>

        {/* ── Loading State ── */}
        {state.status === "loading" && (
          <div className="auth-state">
            <div className="auth-spinner" />
            <p className="auth-message">{state.message}</p>
            <div className="auth-steps">
              <StepIndicator label="Verifying code" done />
              <StepIndicator label="Exchanging tokens" active />
              <StepIndicator label="Creating session" />
            </div>
          </div>
        )}

        {/* ── Success State ── */}
        {state.status === "success" && (
          <div className="auth-state">
            <div className="auth-check">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="auth-message auth-success-text">
              Welcome, {state.user.name}!
            </p>
            <p className="auth-sub">Redirecting to dashboard...</p>
          </div>
        )}

        {/* ── Error State ── */}
        {state.status === "error" && (
          <div className="auth-state">
            <div className="auth-error-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <p className="auth-message auth-error-text">
              Authentication Failed
            </p>
            <p className="auth-sub">{state.message}</p>
            <div className="auth-actions">
              {state.retryable && (
                <button className="auth-btn auth-btn-primary" onClick={handleRetry}>
                  Try Again
                </button>
              )}
              <button className="auth-btn auth-btn-ghost" onClick={handleBackToLogin}>
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inline styles scoped to this page */}
      <style jsx>{`
        .auth-callback-container {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #09090b;
          padding: 24px;
        }

        .auth-callback-card {
          width: 100%;
          max-width: 380px;
          background: #16161a;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 40px 32px;
          text-align: center;
        }

        .auth-logo {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #fc8019, #e0720f);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          color: white;
          box-shadow: 0 4px 16px rgba(252, 128, 25, 0.2);
        }

        .auth-brand {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #fafafa;
          margin-bottom: 32px;
        }

        .auth-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        /* Spinner */
        .auth-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(255, 255, 255, 0.06);
          border-top-color: #fc8019;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Messages */
        .auth-message {
          font-size: 15px;
          font-weight: 600;
          color: #a1a1aa;
        }

        .auth-success-text { color: #22c55e; }
        .auth-error-text { color: #ef4444; }

        .auth-sub {
          font-size: 13px;
          color: #71717a;
          line-height: 1.5;
          max-width: 280px;
        }

        /* Step Indicators */
        .auth-steps {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
          width: 100%;
          max-width: 220px;
        }

        /* Check mark */
        .auth-check {
          width: 56px;
          height: 56px;
          background: rgba(34, 197, 94, 0.1);
          border: 2px solid rgba(34, 197, 94, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22c55e;
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Error icon */
        .auth-error-icon {
          width: 56px;
          height: 56px;
          background: rgba(239, 68, 68, 0.1);
          border: 2px solid rgba(239, 68, 68, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ef4444;
        }

        /* Buttons */
        .auth-actions {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }

        .auth-btn {
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          font-family: inherit;
          transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .auth-btn-primary {
          background: #fc8019;
          color: white;
        }

        .auth-btn-primary:hover {
          background: #e0720f;
          box-shadow: 0 4px 12px rgba(252, 128, 25, 0.25);
        }

        .auth-btn-ghost {
          background: transparent;
          color: #71717a;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .auth-btn-ghost:hover {
          color: #a1a1aa;
          background: rgba(255, 255, 255, 0.04);
        }
      `}</style>
    </div>
  );
}

// ── Step Indicator sub-component ──
function StepIndicator({
  label,
  done,
  active,
}: {
  label: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "12.5px",
        color: done ? "#22c55e" : active ? "#fafafa" : "#52525b",
        fontWeight: active ? 600 : 400,
      }}
    >
      <div
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: done
            ? "rgba(34, 197, 94, 0.15)"
            : active
            ? "rgba(252, 128, 25, 0.15)"
            : "rgba(255,255,255,0.04)",
          border: `1.5px solid ${
            done
              ? "rgba(34, 197, 94, 0.4)"
              : active
              ? "rgba(252, 128, 25, 0.4)"
              : "rgba(255,255,255,0.08)"
          }`,
          fontSize: "10px",
          flexShrink: 0,
        }}
      >
        {done ? "✓" : active ? "•" : ""}
      </div>
      {label}
    </div>
  );
}

// ── Page Export (wrapped in Suspense for useSearchParams) ──
export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#09090b",
            color: "#71717a",
            fontSize: "14px",
          }}
        >
          Loading...
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
