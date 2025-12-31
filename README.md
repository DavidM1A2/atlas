# ATLAS

An interactive world map application built with Next.js and Leaflet.

## About

ATLAS displays a full-screen, interactive world map that users can pan and zoom. The map uses OpenStreetMap tiles and is constrained to world boundaries.

## Features

- **Interactive World Map** - Pan and zoom across the globe with continuous horizontal scrolling
- **Selectable Countries** - Click on any country to select it with visual highlighting
- **Country Info Popup** - View country details in a floating popup panel
- **Hover Effects** - Countries highlight on hover for better interactivity
- **User Authentication** - Login system with role-based access (Admin, Editor, Field Worker, Viewer)

## Tech Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **Leaflet / React-Leaflet** - Interactive map with GeoJSON layers
- **CSS** - Styling
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
│   ├── CountryInfoPane.tsx # Country details popup
│   ├── AuthHeader.tsx      # Login/logout buttons and user badge
│   ├── LoginModal.tsx      # Login form modal
│   └── Providers.tsx       # React context providers wrapper
├── context/
│   └── AuthContext.tsx     # Authentication state management
├── data/
│   └── countries.json      # GeoJSON country boundaries
└── types/
    ├── country.ts          # Country type definitions
    └── auth.ts             # Auth and user role types
```

## How It Works

1. **Country Boundaries** - The map renders country polygons from bundled GeoJSON data
2. **Selection** - Clicking a country updates its style and opens the info pane
3. **Performance** - Selection highlighting uses direct Leaflet API calls (no React re-renders)
4. **State Sync** - Closing the popup clears the map selection via a React effect
5. **Authentication** - React Context manages login state with role-based user types

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
