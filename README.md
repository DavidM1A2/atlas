# ATLAS

An interactive world map application built with Next.js and Leaflet.

## About

ATLAS displays a full-screen, interactive world map that users can pan and zoom. The map uses OpenStreetMap tiles and is constrained to world boundaries.

## Features

- **Interactive World Map** - Pan and zoom across the globe with continuous horizontal scrolling
- **Selectable Countries** - Click on any country to select it with visual highlighting
- **Country Info Popup** - View country details in a floating popup panel
- **Hover Effects** - Countries highlight on hover for better interactivity

## Tech Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **Leaflet / React-Leaflet** - Interactive map with GeoJSON layers
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
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page with state management
│   └── globals.css         # Global styles
├── components/
│   ├── WorldMap.tsx        # Interactive map with country selection
│   └── CountryInfoPane.tsx # Country details popup
├── data/
│   └── countries.json      # GeoJSON country boundaries
└── types/
    └── country.ts          # TypeScript type definitions
```

## How It Works

1. **Country Boundaries** - The map renders country polygons from bundled GeoJSON data
2. **Selection** - Clicking a country updates its style and opens the info pane
3. **Performance** - Selection highlighting uses direct Leaflet API calls (no React re-renders)
4. **State Sync** - Closing the popup clears the map selection via a React effect

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
