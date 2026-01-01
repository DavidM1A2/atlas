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

// EGIDS scale for ethnolinguistic vitality
// Tier 3 = 6a or lower (Vigorous), Tier 2 = 6b (Threatened), Tier 1 = 7+ (Shifting/Dying)
export const EGIDS_LEVELS = ['6a', '6b', '7', '8a', '8b', '9', '10'] as const;
export type EGIDSLevel = (typeof EGIDS_LEVELS)[number];

// Source reliability
export const SOURCE_RELIABILITY_OPTIONS = ['Published', 'Field Collected'] as const;
export type SourceReliability = (typeof SOURCE_RELIABILITY_OPTIONS)[number];

// Scripture/media access levels
// Tier 3 = Undeveloped, Tier 2 = Some Use, Tier 1 = Foundational materials available
export const SCRIPTURE_ACCESS_LEVELS = ['Undeveloped', 'Some Use', 'Foundational'] as const;
export type ScriptureAccessLevel = (typeof SCRIPTURE_ACCESS_LEVELS)[number];

export interface Vitality {
    percentMonolingual: number;
    languageShiftRisk: LanguageShiftRisk;
    egidsLevel: EGIDSLevel;
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
    sourceReliability: SourceReliability;
    scriptureAccess: ScriptureAccessLevel;
    links: ResourceLink[];
    fieldNotes: FieldNote[];
    surveySubmissions: SurveySubmission[];
    attribution: SourceAttribution;
    countryCodes?: string[];
}
