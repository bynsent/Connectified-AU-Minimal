/**
 * Production server for the Connectified React app.
 * - Serves the built Vite output (dist/) as static files
 * - Proxies Monday.com GraphQL mutations so the API token never
 *   reaches the browser
 *
 * Env vars required at runtime (set these in Azure Container Apps
 * → Configuration, NOT baked into the Docker image):
 *   MONDAY_API_TOKEN   - the Monday.com API token
 *   PORT               - optional, defaults to 8080
 */

import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;

app.use(express.json());

// ─── Monday.com proxy ──────────────────────────────────────────
// The three form pages (SIMSignupPage, SIMTicketPage, ContactPage)
// build their own GraphQL mutation string client-side (item name,
// column values, board id — none of that is secret) and POST it
// here. The server attaches the real token and forwards it.
app.post('/api/monday', async (req, res) => {
  if (!MONDAY_API_TOKEN) {
    console.error('MONDAY_API_TOKEN is not set on the server.');
    return res.status(500).json({ error: 'Server is not configured.' });
  }

  const { query } = req.body || {};
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Missing "query" in request body.' });
  }

  try {
    const mondayRes = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MONDAY_API_TOKEN,
        'API-Version': '2024-01',
      },
      body: JSON.stringify({ query }),
    });

    const data = await mondayRes.json();
    res.status(mondayRes.ok ? 200 : 502).json(data);
  } catch (err) {
    console.error('Monday proxy error:', err);
    res.status(502).json({ error: 'Failed to reach Monday.com.' });
  }
});

// ─── Static frontend ───────────────────────────────────────────
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA fallback — any non-API route serves index.html so client-side
// routing (if/when used) and direct refreshes don't 404.
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});