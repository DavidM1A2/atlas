export interface LatLng {
    lat: number;
    lng: number;
}

export interface LanguageClassification {
    family: string;
    branch?: string;
    group?: string;
    isoCode?: string;
}

export interface AlternativeNames {
    endonyms: string[];
    exonyms: string[];
    dialects: string[];
}

export const LANGUAGE_SHIFT_RISKS = ['Low', 'Moderate', 'High', 'Critical'] as const;
export type LanguageShiftRisk = (typeof LANGUAGE_SHIFT_RISKS)[number];

export interface Vitality {
    percentMonolingual: number;
    languageShiftRisk: LanguageShiftRisk;
}

export const CHURCH_PRESENCE_OPTIONS = ['None', 'Emerging', 'Growing', 'Healthy Indigenous-Led'] as const;
export type ChurchPresence = (typeof CHURCH_PRESENCE_OPTIONS)[number];

export interface ResourceLink {
    label: string;
    url: string;
}

export interface FieldNote {
    id: string;
    date: string;
    author: string;
    content: string;
}

export interface SurveySubmission {
    id: string;
    date: string;
    submittedBy: string;
    surveyType: string;
    data: Record<string, unknown>;
}

export interface SourceAttribution {
    primarySource: string;
    lastUpdated: string;
    lastUpdatedBy?: string;
    references?: string[];
}

export interface LanguageGroup {
    id: string;
    name: string;
    coordinates: LatLng[];
    classification: LanguageClassification;
    alternativeNames: AlternativeNames;
    population: number;
    vitality: Vitality;
    churchPresence: ChurchPresence;
    links: ResourceLink[];
    fieldNotes: FieldNote[];
    surveySubmissions: SurveySubmission[];
    attribution: SourceAttribution;
    countryCodes?: string[];
}
