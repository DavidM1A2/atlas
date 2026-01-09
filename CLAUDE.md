# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Run production build
```

## Environment Setup

Copy `.env.example` to `.env` and configure:
- `AIRTABLE_API_KEY` - Airtable personal access token for backend database

## Architecture

ATLAS is a Next.js 16 app with React 19 for visualizing ethnolinguistic data on an interactive world map using Leaflet.

### Key Patterns

**Dynamic Import for Leaflet**: WorldMap is loaded with `next/dynamic` and `ssr: false` because Leaflet requires browser APIs. The component uses `useSyncExternalStore` to detect client-side mounting before rendering.

**React Context for State**: Two contexts manage global state:
- `AuthContext` - User authentication and role (Admin, Editor, Field Worker, Viewer)
- `LanguageGroupContext` - Language group data with in-memory edit tracking (edits not persisted to backend)

**Role-Based Permissions**: `src/utils/permissions.ts` controls feature access:
- Admin/Editor: Full access to all language groups, global filters, color coding
- Field Worker: Edit access only to language groups in assigned countries
- Viewer: Read access only to assigned regions
- Anonymous: Overview tab only, no filters/color coding

**Backend Service Layer**: `src/utils/backendService.ts` abstracts data operations. Currently uses mock data from `src/data/` but designed for Airtable integration.

**Map Selection Handling**: Country selection uses direct Leaflet API calls (`setStyle`) stored in refs to avoid React re-renders. Selection state syncs via effects.

### Path Aliases

TypeScript uses `@/*` to map to `./src/*`.

### Component Structure

- `src/app/page.tsx` - Main page with panel state management (discriminated union for country/languageGroup/none)
- `src/components/WorldMap.tsx` - Leaflet map with GeoJSON country boundaries and language markers
- `src/components/tabs/` - Tab components for CountryInfoPane and LanguageGroupPane
- `src/types/` - TypeScript type definitions for domain objects

### Data Types

Language groups have EGIDS vitality levels (6a-10), church presence status, scripture access levels, and support multiple coordinates for display. Country data includes population, GDP, poverty rate, and Christian percentage.
