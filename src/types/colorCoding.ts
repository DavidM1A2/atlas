// Color coding for language group markers (currently empty since data model is simplified)
export type ColorMetric = never;

export interface ColorCodingState {
    selectedMetrics: ColorMetric[];
}

export const DEFAULT_COLOR_CODING: ColorCodingState = {
    selectedMetrics: [],
};

export const COLOR_METRICS: readonly { key: ColorMetric; label: string }[] = [];
