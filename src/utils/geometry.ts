import type { Feature, Polygon, MultiPolygon, Position } from 'geojson';

/**
 * Ray casting algorithm to determine if a point is inside a polygon ring
 */
function pointInPolygonRing(point: [number, number], ring: Position[]): boolean {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i][0];
        const yi = ring[i][1];
        const xj = ring[j][0];
        const yj = ring[j][1];

        const intersect =
            yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

        if (intersect) inside = !inside;
    }

    return inside;
}

/**
 * Check if a point is inside a polygon (with holes support)
 */
function pointInPolygon(point: [number, number], polygon: Polygon): boolean {
    // Check outer ring
    if (!pointInPolygonRing(point, polygon.coordinates[0])) {
        return false;
    }

    // Check holes - if point is in a hole, it's not in the polygon
    for (let i = 1; i < polygon.coordinates.length; i++) {
        if (pointInPolygonRing(point, polygon.coordinates[i])) {
            return false;
        }
    }

    return true;
}

/**
 * Check if a point is inside a GeoJSON feature (Polygon or MultiPolygon)
 */
export function pointInFeature(
    point: { lat: number; lng: number },
    feature: Feature<Polygon | MultiPolygon>
): boolean {
    // GeoJSON uses [longitude, latitude] order
    const coords: [number, number] = [point.lng, point.lat];

    if (feature.geometry.type === 'Polygon') {
        return pointInPolygon(coords, feature.geometry);
    }

    if (feature.geometry.type === 'MultiPolygon') {
        return feature.geometry.coordinates.some((polygonCoords) =>
            pointInPolygon(coords, { type: 'Polygon', coordinates: polygonCoords })
        );
    }

    return false;
}
