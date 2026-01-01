export type ColorMetric =
    | 'churchPresence'
    | 'egidsLevel'
    | 'population'
    | 'scriptureAccess';

export interface ColorCodingState {
    selectedMetrics: ColorMetric[];
}

export const DEFAULT_COLOR_CODING: ColorCodingState = {
    selectedMetrics: [],
};

export const COLOR_METRICS: readonly { key: ColorMetric; label: string }[] = [
    { key: 'churchPresence', label: 'Church Status' },
    { key: 'egidsLevel', label: 'Language Vitality (EGIDS)' },
    { key: 'population', label: 'Population Size' },
    { key: 'scriptureAccess', label: 'Scripture Access' },
] as const;
