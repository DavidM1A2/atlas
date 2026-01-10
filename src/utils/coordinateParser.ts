import type { LatLng } from '@/types/languageGroup';

/**
 * Parse a single coordinate value (latitude or longitude) from various formats:
 * - DMS suffix: 45°30'15.5"N or 120°45'30.0"E or 33°15'45.00" S
 * - DMS prefix: N45°30'15.5" or E120°45'30.0"
 * - DM (degrees + decimal minutes): N45° 30.258' or 45° 30.258'N
 * - Decimal with direction: 45.504305"N or N45.504305
 * - Plain decimal: 45.504305
 *
 * Returns decimal degrees (negative for S/W)
 */
function parseCoordinateValue(value: string): number | null {
    let trimmed = value.trim();
    if (!trimmed) return null;

    // Extract direction if present (can be prefix or suffix)
    let direction: string | null = null;

    // Check for direction prefix (e.g., N45° or E120°)
    const prefixMatch = trimmed.match(/^([NSEW])\s*(.+)$/i);
    if (prefixMatch) {
        direction = prefixMatch[1].toUpperCase();
        trimmed = prefixMatch[2].trim();
    }

    // Check for direction suffix (e.g., 45°N or 120" E)
    const suffixMatch = trimmed.match(/^(.+?)\s*([NSEW])$/i);
    if (suffixMatch && !direction) {
        direction = suffixMatch[2].toUpperCase();
        trimmed = suffixMatch[1].trim();
    }

    let decimal: number | null = null;

    // Try DMS format: degrees°minutes'seconds" (seconds optional for DM format)
    // Examples: 45°30'15.5", 45° 30.258', 120°45'30.0"
    const dmsMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*°\s*(\d+(?:\.\d+)?)\s*['′](?:\s*(\d+(?:\.\d+)?)\s*["″]?)?$/);
    if (dmsMatch) {
        const degrees = parseFloat(dmsMatch[1]);
        const minutes = parseFloat(dmsMatch[2]);
        const seconds = dmsMatch[3] ? parseFloat(dmsMatch[3]) : 0;

        decimal = Math.abs(degrees) + minutes / 60 + seconds / 3600;
        if (degrees < 0) {
            decimal = -decimal;
        }
    }

    // Try degrees only: 45° or 45.5°
    if (decimal === null) {
        const degOnlyMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*°?$/);
        if (degOnlyMatch) {
            decimal = parseFloat(degOnlyMatch[1]);
        }
    }

    // Try decimal with quote mark: 45.504305"
    if (decimal === null) {
        const decimalQuoteMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*["″]?$/);
        if (decimalQuoteMatch) {
            decimal = parseFloat(decimalQuoteMatch[1]);
        }
    }

    // Try plain decimal
    if (decimal === null) {
        const plainMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)$/);
        if (plainMatch) {
            decimal = parseFloat(plainMatch[1]);
        }
    }

    if (decimal === null) return null;

    // Apply direction
    if (direction === 'S' || direction === 'W') {
        decimal = -Math.abs(decimal);
    }

    return decimal;
}

/**
 * Parse a coordinate pair from various formats.
 * Handles comma-separated lat/lng pairs.
 *
 * Returns LatLng or null if parsing fails
 */
function parseCoordinatePair(pair: string): LatLng | null {
    // Remove surrounding parentheses and extra whitespace
    let cleaned = pair.trim().replace(/^\(|\)$/g, '').trim();

    // Handle formats where there's no comma but direction letters separate values
    // e.g., "N45° 30.258' E120° 45.500'"
    if (!cleaned.includes(',')) {
        // Try to split on direction letters that appear mid-string
        // Look for patterns like "...N ...E" or "...S ...W" where a direction starts a new coordinate
        const splitMatch = cleaned.match(/^(.+?[°'″"\d])\s+([NSEW].+)$/i);
        if (splitMatch) {
            cleaned = splitMatch[1] + ', ' + splitMatch[2];
        }
    }

    // Split by comma
    const parts = cleaned.split(',').map(p => p.trim());
    if (parts.length !== 2) return null;

    const first = parseCoordinateValue(parts[0]);
    const second = parseCoordinateValue(parts[1]);

    if (first === null || second === null) return null;

    // Determine which is lat and which is lng based on direction or value
    let lat: number;
    let lng: number;

    // Check if we can determine from the original strings
    const firstUpper = parts[0].toUpperCase();
    const secondUpper = parts[1].toUpperCase();

    if (firstUpper.includes('N') || firstUpper.includes('S')) {
        // First is latitude
        lat = first;
        lng = second;
    } else if (firstUpper.includes('E') || firstUpper.includes('W')) {
        // First is longitude
        lat = second;
        lng = first;
    } else if (secondUpper.includes('N') || secondUpper.includes('S')) {
        // Second is latitude
        lat = second;
        lng = first;
    } else if (secondUpper.includes('E') || secondUpper.includes('W')) {
        // Second is longitude
        lat = first;
        lng = second;
    } else {
        // No direction indicators - assume first is lat, second is lng
        lat = first;
        lng = second;
    }

    // Validate ranges
    if (lat < -90 || lat > 90) return null;
    if (lng < -180 || lng > 180) return null;

    return { lat, lng };
}

/**
 * Parse a coordinate string that may contain one or more coordinate pairs.
 * Formats supported:
 * - DMS: "45°30'15.5"N, 120°45'30.0"E"
 * - DMS with spaces: "(33°15'45.00" S, 70°40'00.00" W)"
 * - DM (degrees + decimal minutes): "N45° 30.258', E120° 45.500'"
 * - Decimal: "(45.50"N, 120.75"E)"
 * - Multiple pairs: "(45.50"N, 120.75"E), (46.25"N, 121.50"E)"
 *
 * Returns array of LatLng objects
 */
export function parseCoordinates(coordinateString: string | null | undefined): LatLng[] {
    if (!coordinateString) {
        return [];
    }

    const trimmed = coordinateString.trim();
    if (!trimmed) return [];

    const coordinates: LatLng[] = [];

    // Check if it contains multiple coordinate pairs (indicated by parentheses with content)
    const parenPairs = trimmed.match(/\([^)]+\)/g);
    if (parenPairs && parenPairs.length > 0) {
        // Has parenthesized groups - parse each one
        for (const pairStr of parenPairs) {
            const coord = parseCoordinatePair(pairStr);
            if (coord) {
                coordinates.push(coord);
            }
        }
    }

    // If we didn't get any coordinates from parentheses, try parsing as a single pair
    if (coordinates.length === 0) {
        const coord = parseCoordinatePair(trimmed);
        if (coord) {
            coordinates.push(coord);
        }
    }

    return coordinates;
}
