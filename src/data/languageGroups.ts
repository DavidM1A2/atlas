import type { LanguageGroup } from '@/types/languageGroup';

export const mockLanguageGroups: LanguageGroup[] = [
    {
        id: 'hmong-1',
        name: 'Hmong Daw',
        coordinates: [{ lat: 19.8563, lng: 102.4955 }],
        classification: {
            family: 'Hmong-Mien',
            branch: 'Hmongic',
            group: 'Chuanqiandian',
            isoCode: 'mww',
        },
        alternativeNames: {
            endonyms: ['Hmoob Dawb', 'White Hmong'],
            exonyms: ['Miao', 'Meo'],
            dialects: ['White Hmong', 'Green Hmong', 'Striped Hmong'],
        },
        population: 1800000,
        vitality: {
            percentMonolingual: 15,
            languageShiftRisk: 'Moderate',
            egidsLevel: '6a',
        },
        churchPresence: 'Growing',
        sourceReliability: 'Published',
        scriptureAccess: 'Some Use',
        links: [
            { label: 'Scripture Resources', url: 'https://example.com/hmong-bible' },
            { label: 'Training Materials', url: 'https://example.com/hmong-training' },
        ],
        fieldNotes: [
            {
                id: 'fn-1',
                date: '2024-06-15',
                author: 'John Smith',
                content: 'Met with community elders in Luang Prabang province. Strong interest in audio scripture resources due to oral tradition culture.',
            },
        ],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Ethnologue',
            lastUpdated: '2024-01-15',
            references: ['Laos Census 2020'],
        },
    },
    {
        id: 'khmu-1',
        name: 'Khmu',
        coordinates: [
            { lat: 20.4500, lng: 103.9500 },
            { lat: 21.0000, lng: 103.2500 },
        ],
        classification: {
            family: 'Austroasiatic',
            branch: 'Khmuic',
            group: 'Khmu',
            isoCode: 'kjg',
        },
        alternativeNames: {
            endonyms: ['Kmhmu', 'Kammu'],
            exonyms: ['Khamu', 'Khamou', 'Lao Theung'],
            dialects: ['Northern Khmu', 'Southern Khmu', 'Western Khmu'],
        },
        population: 710000,
        vitality: {
            percentMonolingual: 35,
            languageShiftRisk: 'Moderate',
            egidsLevel: '7',
        },
        churchPresence: 'Emerging',
        sourceReliability: 'Field Collected',
        scriptureAccess: 'Undeveloped',
        links: [
            { label: 'Scripture Resources', url: 'https://example.com/khmu-scripture' },
            { label: 'Training Materials', url: 'https://example.com/khmu-training' },
        ],
        fieldNotes: [
            {
                id: 'fn-4',
                date: '2024-07-10',
                author: 'David Lee',
                content: 'Visited several Khmu villages in Luang Prabang province. Strong oral tradition culture. Audio scripture resources are particularly well-received.',
            },
        ],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Ethnologue',
            lastUpdated: '2024-02-28',
        },
    },
];
