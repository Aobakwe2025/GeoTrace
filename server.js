// server.js — run with: node server.js
// Then open http://localhost:3000 in your browser

const http = require('http');
const fs   = require('fs');
const path = require('path');
const https = require('https');

const PORT = 3000;

function fetchGeoData(ip, callback) {
  const target = ip
    ? `https://ipwho.is/${ip}`
    : `https://ipwho.is/`;

  https.get(target, { headers: { 'User-Agent': 'GeoTrace/1.0' } }, (res) => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', () => {
      try {
        const d = JSON.parse(raw);
        if (!d.success) return callback({ error: d.message || 'Lookup failed' });

        callback(null, {
          ip:           d.ip,
          city:         d.city         || '',
          region:       d.region       || '',
          country_name: d.country      || '',
          country:      d.country_code || '',
          postal:       d.postal       || '',
          latitude:     d.latitude,
          longitude:    d.longitude,
          timezone:     d.timezone?.id || '',
          org:          d.connection?.isp || d.connection?.org || '',
        });
      } catch(e) {
        callback({ error: 'Invalid response from geo API' });
      }
    });
  }).on('error', (e) => callback({ error: e.message }));
}

const server = http.createServer((req, res) => {
  // ── CORS headers so browser never blocks ──
  res.setHeader('Access-Control-Allow-Origin', '*');

  // ── API route: /api/lookup?ip=1.2.3.4 ──
  if (req.url.startsWith('/api/lookup')) {
    const urlObj = new URL(req.url, `http://localhost:${PORT}`);
    const ip     = urlObj.searchParams.get('ip') || '';

    fetchGeoData(ip || null, (err, data) => {
      res.writeHead(err ? 500 : 200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err ? { error: true, message: err.error } : data));
    });
    return;
  }

  // ── Serve index.html for everything else ──
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('index.html not found — make sure server.js and index.html are in the same folder.');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ✅  GeoTrace server running!');
  console.log(`  👉  Open this in your browser: http://localhost:${PORT}`);
  console.log('');
  console.log('  Press Ctrl+C to stop.');
  console.log('');
});