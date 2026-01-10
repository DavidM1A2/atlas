export type ColorMetric = 'population';

export interface ColorCodingState {
    selectedMetrics: ColorMetric[];
}

export const DEFAULT_COLOR_CODING: ColorCodingState = {
    selectedMetrics: [],
};

export const COLOR_METRICS: readonly { key: ColorMetric; label: string }[] = [
    { key: 'population', label: 'Population Size' },
] as const;
