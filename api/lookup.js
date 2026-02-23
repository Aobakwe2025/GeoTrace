// api/lookup.js — Vercel Serverless Function
// Acts as a proxy so the browser never hits the API directly (no CORS issues)

export default async function handler(req, res) {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { ip } = req.query;

  try {
    // Use ip-api.com — free, no key needed, CORS-safe via server proxy
    const fields = 'status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,query';
    const target = ip ? `http://ip-api.com/json/${ip}?fields=${fields}` : `http://ip-api.com/json/?fields=${fields}`;

    const response = await fetch(target);

    if (!response.ok) {
      throw new Error(`Upstream API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'fail') {
      return res.status(400).json({ error: true, message: data.message || 'Invalid or private IP address' });
    }

    // Normalize to a clean shape
    return res.status(200).json({
      ip:           data.query,
      city:         data.city,
      region:       data.regionName,
      country_name: data.country,
      country:      data.countryCode,
      postal:       data.zip,
      latitude:     data.lat,
      longitude:    data.lon,
      timezone:     data.timezone,
      org:          data.org || data.isp,
    });

  } catch (err) {
    console.error('Lookup error:', err.message);
    return res.status(500).json({ error: true, message: 'Failed to fetch location data. Please try again.' });
  }
}