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
        },
        churchPresence: 'Growing',
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
        id: 'karen-1',
        name: 'S\'gaw Karen',
        coordinates: [{ lat: 16.8661, lng: 96.1951 }],
        classification: {
            family: 'Sino-Tibetan',
            branch: 'Karenic',
            isoCode: 'ksw',
        },
        alternativeNames: {
            endonyms: ['Pgaz K\'Nyau'],
            exonyms: ['White Karen', 'Kariang'],
            dialects: ['Pa-an', 'Hpa-an', 'Moulmein'],
        },
        population: 3200000,
        vitality: {
            percentMonolingual: 20,
            languageShiftRisk: 'Low',
        },
        churchPresence: 'Healthy Indigenous-Led',
        links: [
            { label: 'Church Planting Case Study', url: 'https://example.com/karen-case-study' },
            { label: 'Scripture Resources', url: 'https://example.com/karen-scripture' },
        ],
        fieldNotes: [],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Myanmar Census Department',
            lastUpdated: '2024-03-20',
        },
    },
    {
        id: 'shan-1',
        name: 'Shan',
        coordinates: [{ lat: 20.7891, lng: 97.0361 }],
        classification: {
            family: 'Tai-Kadai',
            branch: 'Tai',
            group: 'Southwestern Tai',
            isoCode: 'shn',
        },
        alternativeNames: {
            endonyms: ['Tai Yai', 'Tai Long'],
            exonyms: ['Burmese Shan', 'Thai Yai'],
            dialects: ['Northern Shan', 'Southern Shan'],
        },
        population: 3300000,
        vitality: {
            percentMonolingual: 8,
            languageShiftRisk: 'Moderate',
        },
        churchPresence: 'Emerging',
        links: [
            { label: 'Training Materials', url: 'https://example.com/shan-training' },
        ],
        fieldNotes: [
            {
                id: 'fn-2',
                date: '2024-08-01',
                author: 'Sarah Johnson',
                content: 'Visited Shan communities near Thai border. Strong Buddhist cultural ties but growing openness to Christian message among youth.',
            },
        ],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Ethnologue',
            lastUpdated: '2024-02-10',
        },
    },
    {
        id: 'akha-1',
        name: 'Akha',
        coordinates: [{ lat: 20.2756, lng: 100.0870 }],
        classification: {
            family: 'Sino-Tibetan',
            branch: 'Tibeto-Burman',
            group: 'Loloish',
            isoCode: 'ahk',
        },
        alternativeNames: {
            endonyms: ['Akhaq'],
            exonyms: ['Ikaw', 'Kaw', 'Ekaw'],
            dialects: ['Chiangrai Akha', 'Phongsali Akha'],
        },
        population: 600000,
        vitality: {
            percentMonolingual: 30,
            languageShiftRisk: 'Moderate',
        },
        churchPresence: 'Growing',
        links: [
            { label: 'Scripture Resources', url: 'https://example.com/akha-bible' },
            { label: 'Church Planting Case Study', url: 'https://example.com/akha-church-study' },
            { label: 'Training Materials', url: 'https://example.com/akha-training' },
        ],
        fieldNotes: [],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Thailand Hill Tribes Survey',
            lastUpdated: '2024-04-05',
        },
    },
    {
        id: 'jarai-1',
        name: 'Jarai',
        coordinates: [{ lat: 13.7833, lng: 108.0000 }],
        classification: {
            family: 'Austronesian',
            branch: 'Malayo-Polynesian',
            group: 'Chamic',
            isoCode: 'jra',
        },
        alternativeNames: {
            endonyms: ['Gia Rai'],
            exonyms: ['Djarai', 'Gio-Rai'],
            dialects: ['Pleiku', 'Cheo Reo', 'Hdrung'],
        },
        population: 450000,
        vitality: {
            percentMonolingual: 18,
            languageShiftRisk: 'Moderate',
        },
        churchPresence: 'Healthy Indigenous-Led',
        links: [
            { label: 'Scripture Resources', url: 'https://example.com/jarai-scripture' },
        ],
        fieldNotes: [
            {
                id: 'fn-3',
                date: '2024-05-22',
                author: 'Michael Brown',
                content: 'Central Highlands visit confirmed vibrant church communities. Indigenous leadership strong but resources for discipleship materials needed.',
            },
        ],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Vietnam Ethnic Minorities Survey',
            lastUpdated: '2024-01-30',
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
        },
        churchPresence: 'Emerging',
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
