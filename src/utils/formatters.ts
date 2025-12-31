/**
 * Format a number as a localized population string
 */
export function formatPopulation(population: number): string {
    return population.toLocaleString();
}

/**
 * Format a number as a GDP string in billions (e.g., "$500.0B")
 */
export function formatGDP(gdp: number): string {
    return `$${(gdp / 1e9).toFixed(1)}B`;
}

/**
 * Format a percentage (e.g., "12.5%")
 */
export function formatPercent(value: number): string {
    return `${value}%`;
}
