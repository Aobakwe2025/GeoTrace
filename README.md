# 🌐 GeoTrace — IP Geolocation Map- SoftGrowTech

> Enter any IP address and instantly see its location plotted on an interactive map — with city, region, country, timezone, ISP, and coordinates displayed in a sleek dark dashboard.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet.js-199900?style=flat&logo=leaflet&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## 📌 About

**GeoTrace** is a full-stack web application built as part of a scripting and automation project series. It fetches geolocation data for any IP address via a serverless API proxy and displays the result on a live interactive map.

The key engineering challenge this project solves: browsers block direct API calls from local files and cross-origin requests (CORS). GeoTrace routes all API calls through a **server-side proxy** — either a local Node.js server for development, or a Vercel Serverless Function in production — so the app works reliably in all environments.

**Concepts demonstrated:**
- Serverless backend functions (Vercel)
- REST API consumption and data normalization
- Interactive maps with Leaflet.js + OpenStreetMap
- CORS handling via server-side proxying
- Responsive dark dashboard UI in pure HTML/CSS/JS

---

## ✨ Features

- 🔍 **IP Lookup** — trace any valid IPv4 address
- 📍 **My IP** — auto-detect and map your own IP on load
- 🗺️ **Live Map** — animated fly-to with a glowing location marker
- 📊 **Info Panel** — City, Region, Country, Postal Code, Timezone, ISP, Coordinates
- 🕐 **Search History** — last 5 lookups, click any to re-trace
- 🛡️ **Server Proxy** — all API calls go through the backend, no CORS issues
- 📱 **Responsive** — works on desktop and mobile

---
![Screenshot_23-2-2026_182341_localhost](https://github.com/user-attachments/assets/816e56dc-71d6-4f9a-826b-24e9e21f7bd1)

## 🗂️ Project Structure

```
geotrace/
│
├── api/
│   └── lookup.js        # Vercel Serverless Function — proxies IP geolocation API
│
├── public/
│   └── index.html       # Frontend dashboard (HTML + CSS + JS)
│
├── server.js            # Local dev server (use when running without Vercel)
├── vercel.json          # Vercel routing configuration
├── package.json         # Project metadata
├── .gitignore
└── README.md
```

### How the proxy works
```
Browser  →  /api/lookup  →  server (Node.js or Vercel)  →  ipwho.is API  →  back to browser
```
The browser never calls the external API directly — the server does it. This eliminates CORS errors completely.

---

## 🚀 Running Locally

Make sure you have **Node.js** installed. Check with:
```bash
node -v
```

Then:
```bash
# 1. Clone the repo
git clone https://github.com/your-username/geotrace.git
cd geotrace

# 2. Start the local server
node server.js

# 3. Open in your browser
# http://localhost:3000
```

> ⚠️ Do NOT open `index.html` by double-clicking it. You must use `node server.js` and visit `http://localhost:3000` — otherwise the browser will block all API calls.

---

## ☁️ Hosting on Vercel — Step by Step

### Step 1 — Push your project to GitHub

If you haven't already, create a GitHub repo and push your code:

```bash
# Inside your project folder
git init
git add .
git commit -m "Initial commit: GeoTrace IP geolocation map"
```

Then go to [github.com](https://github.com) → click **New repository** → name it `geotrace` → click **Create repository**.

Copy the commands GitHub shows you under *"push an existing repository"*, which look like:

```bash
git remote add origin https://github.com/your-username/geotrace.git
git branch -M main
git push -u origin main
```

---

### Step 2 — Sign up / Log in to Vercel

Go to [vercel.com](https://vercel.com) and sign up using your **GitHub account**. This links Vercel directly to your repos.

---

### Step 3 — Import your GitHub repo

1. On the Vercel dashboard click **"Add New Project"**
2. You'll see a list of your GitHub repos — find **geotrace** and click **"Import"**

---

### Step 4 — Configure the project

On the configuration screen:

| Setting | Value |
|---|---|
| **Framework Preset** | `Other` |
| **Root Directory** | `.` (leave as default) |
| **Build Command** | *(leave blank)* |
| **Output Directory** | `public` |

Everything else can stay as default.

---

### Step 5 — Deploy

Click **"Deploy"**. Vercel will build and deploy in about 30 seconds.

You'll get a live URL like:
```
https://geotrace-your-username.vercel.app
```

That's it — your app is live! 🎉

---

### Step 6 — Future updates (auto-deploy)

Any time you push new code to GitHub, Vercel will **automatically redeploy**:

```bash
git add .
git commit -m "your update message"
git push
```

Vercel detects the push and deploys within seconds.

Deployment link: https://geo-trace-ruby.vercel.app/

---

## 🔌 API Used

| API | Endpoint | Free Tier |
|---|---|---|
| [ipwho.is](https://ipwho.is) | `https://ipwho.is/{ip}` | Unlimited, no key needed |

Returns: IP, City, Region, Country, Postal Code, Latitude, Longitude, Timezone, ISP/Org.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Map | [Leaflet.js](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) |
| Backend (local) | Node.js HTTP server (`server.js`) |
| Backend (production) | Vercel Serverless Functions |
| Geolocation API | [ipwho.is](https://ipwho.is) |
| Hosting | [Vercel](https://vercel.com) |
| Fonts | Google Fonts — Syne + Space Mono |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

Built by **[Aobakwe]** · 
