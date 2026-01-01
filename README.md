# ATLAS

An interactive world map application built with Next.js and Leaflet for tracking and visualizing ethnolinguistic data. Designed to work seamlessly on both mobile and desktop devices.

## About

ATLAS displays a full-screen, interactive world map that users can pan and zoom. It provides tools for visualizing language groups, filtering ethnolinguistic data, and managing field research information with role-based access control.

## Features

- **Interactive World Map** - Pan and zoom across the globe with continuous horizontal scrolling
- **Selectable Countries** - Click on any country to select it with border-style highlighting
- **Country Info Pane** - View country details including statistics in a tabbed interface (Overview, Vitality, Church, Resources, Notes)
- **Language Group Markers** - Visual markers for language groups with role-based editing capabilities
- **Multi-Filter Panel** - Filter ethnolinguistic data by various criteria
- **Map Tile Selector** - Switch between map tile providers with preference persistence
- **User Authentication** - Login system with role-based access (Admin, Editor, Field Worker, Viewer)
- **Responsive Design** - Works on both mobile and desktop devices

## Tech Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **Leaflet / React-Leaflet** - Interactive map with GeoJSON layers
- **CSS Modules** - Component-scoped styling
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
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page with state management
│   └── globals.css             # Global styles
├── components/
│   ├── WorldMap.tsx            # Interactive map with country selection
│   ├── CountryInfoPane.tsx     # Country details popup with tabs
│   ├── LanguageMarkers.tsx     # Language group map markers
│   ├── LanguageGroupPane.tsx   # Language group detail panel
│   ├── FilterPanel.tsx         # Multi-filter panel for data filtering
│   ├── TileSelector.tsx        # Map tile provider selector
│   ├── AuthHeader.tsx          # Login/logout buttons and user badge
│   ├── LoginModal.tsx          # Login form modal
│   ├── EditableField.tsx       # Inline editable field component
│   ├── CloseButton.tsx         # Reusable close button
│   ├── Providers.tsx           # React context providers wrapper
│   └── tabs/                   # Country info tab components
│       ├── OverviewTab.tsx
│       ├── VitalityTab.tsx
│       ├── ChurchTab.tsx
│       ├── ResourcesTab.tsx
│       └── NotesTab.tsx
├── context/
│   ├── AuthContext.tsx         # Authentication state management
│   └── LanguageGroupContext.tsx # Language group state management
├── data/
│   ├── countries.json          # GeoJSON country boundaries
│   ├── countryData.ts          # Country statistics data
│   ├── languageGroups.ts       # Language group definitions
│   ├── tiles.ts                # Map tile provider configurations
│   └── users.ts                # Mock user data
├── types/
│   ├── auth.ts                 # Auth and user role types
│   ├── country.ts              # Country type definitions
│   ├── filters.ts              # Filter type definitions
│   ├── languageGroup.ts        # Language group types
│   └── tile.ts                 # Tile provider types
└── utils/
    ├── backendService.ts       # Unified backend service layer
    ├── countryDetection.ts     # Country detection utilities
    ├── filterUtils.ts          # Filter logic utilities
    ├── formatters.ts           # Data formatting utilities
    ├── geometry.ts             # Geometry calculations
    ├── mapStyles.ts            # Map styling utilities
    └── permissions.ts          # Role-based permission checks
```

## How It Works

1. **Country Boundaries** - The map renders country polygons from bundled GeoJSON data
2. **Selection** - Clicking a country updates its border style and opens the info pane
3. **Language Groups** - Markers display language group locations with popup details
4. **Filtering** - The filter panel allows narrowing data by ethnolinguistic criteria
5. **Performance** - Selection highlighting uses direct Leaflet API calls (no React re-renders)
6. **State Sync** - Closing panels clears map selection via React effects
7. **Authentication** - React Context manages login state with role-based permissions
8. **Backend Service** - Unified service layer abstracts data operations

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
