# ATLAS

An interactive world map application built with Next.js and Leaflet.

## About

ATLAS displays a full-screen, interactive world map that users can pan and zoom. The map uses OpenStreetMap tiles and is constrained to world boundaries.

## Tech Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **Leaflet / React-Leaflet** - Interactive map
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
└── components/
    └── WorldMap.tsx    # Interactive map component
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
