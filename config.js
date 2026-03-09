// ══════════════════════════════════════════════════════════════════
//  Gwen Beauty — Frontend API Configuration
//  ✏️  Set BACKEND_URL to your deployed backend (Render / Railway)
//  🚫  Do NOT add a trailing slash at the end
// ══════════════════════════════════════════════════════════════════

 const BACKEND_URL = "https://cosmetics-gwen.onrender.com";  // ← Replace with your Render URL

// ── Auto-detect: use localhost when running locally ───────────────
const API_URL = (() => {
    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Local development
        return 'http://localhost:5001/api';
    }
    // Production (Netlify) → point to Render backend
    return `${BACKEND_URL}/api`;
})();
