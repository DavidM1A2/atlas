import type { LanguageGroup } from '@/types/languageGroup';

export const mockLanguageGroups: LanguageGroup[] = [
    {
        id: 'navajo-1',
        name: 'Navajo',
        coordinates: [{ lat: 36.0672, lng: -109.0452 }],
        classification: {
            family: 'Na-Dene',
            branch: 'Athabaskan',
            group: 'Southern Athabaskan',
            isoCode: 'nav',
        },
        alternativeNames: {
            endonyms: ['Diné bizaad', 'Naabeehó bizaad'],
            exonyms: ['Navaho'],
            dialects: ['Eastern Navajo', 'Western Navajo', 'Central Navajo'],
        },
        population: 170000,
        vitality: {
            percentMonolingual: 12,
            languageShiftRisk: 'High',
        },
        churchPresence: 'Growing',
        links: [
            { label: 'Scripture Resources', url: 'https://example.com/navajo-bible' },
            { label: 'Training Materials', url: 'https://example.com/navajo-training' },
        ],
        fieldNotes: [
            {
                id: 'fn-1',
                date: '2024-06-15',
                author: 'John Smith',
                content: 'Met with community elders to discuss language preservation efforts. Strong interest in youth programs combining traditional stories with scripture.',
            },
        ],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Ethnologue',
            lastUpdated: '2024-01-15',
            references: ['US Census Bureau 2020'],
        },
    },
    {
        id: 'cherokee-1',
        name: 'Cherokee',
        coordinates: [{ lat: 35.5074, lng: -83.5270 }],
        classification: {
            family: 'Iroquoian',
            branch: 'Southern Iroquoian',
            isoCode: 'chr',
        },
        alternativeNames: {
            endonyms: ['Tsalagi'],
            exonyms: [],
            dialects: ['Eastern Cherokee', 'Western Cherokee', 'Kituwah'],
        },
        population: 22000,
        vitality: {
            percentMonolingual: 5,
            languageShiftRisk: 'Critical',
        },
        churchPresence: 'Healthy Indigenous-Led',
        links: [
            { label: 'Church Planting Case Study', url: 'https://example.com/cherokee-case-study' },
            { label: 'Scripture Resources', url: 'https://example.com/cherokee-scripture' },
        ],
        fieldNotes: [],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Cherokee Nation Language Department',
            lastUpdated: '2024-03-20',
        },
    },
    {
        id: 'lakota-1',
        name: 'Lakota',
        coordinates: [{ lat: 43.8791, lng: -102.3412 }],
        classification: {
            family: 'Siouan',
            branch: 'Western Siouan',
            group: 'Mississippi Valley',
            isoCode: 'lkt',
        },
        alternativeNames: {
            endonyms: ['Lakȟótiyapi'],
            exonyms: ['Sioux', 'Teton Sioux'],
            dialects: ['Northern Lakota', 'Southern Lakota'],
        },
        population: 6000,
        vitality: {
            percentMonolingual: 2,
            languageShiftRisk: 'Critical',
        },
        churchPresence: 'Emerging',
        links: [
            { label: 'Training Materials', url: 'https://example.com/lakota-training' },
        ],
        fieldNotes: [
            {
                id: 'fn-2',
                date: '2024-08-01',
                author: 'Sarah Johnson',
                content: 'Language revitalization efforts gaining momentum on Pine Ridge Reservation. Several young people expressing interest in both language learning and faith exploration.',
            },
        ],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Lakota Language Consortium',
            lastUpdated: '2024-02-10',
        },
    },
    {
        id: 'hawaiian-1',
        name: 'Hawaiian',
        coordinates: [{ lat: 19.8987, lng: -155.6659 }],
        classification: {
            family: 'Austronesian',
            branch: 'Malayo-Polynesian',
            group: 'Polynesian',
            isoCode: 'haw',
        },
        alternativeNames: {
            endonyms: ['ʻŌlelo Hawaiʻi'],
            exonyms: [],
            dialects: ['Niʻihau', 'Kauaʻi'],
        },
        population: 24000,
        vitality: {
            percentMonolingual: 1,
            languageShiftRisk: 'Moderate',
        },
        churchPresence: 'Healthy Indigenous-Led',
        links: [
            { label: 'Scripture Resources', url: 'https://example.com/hawaiian-bible' },
            { label: 'Church Planting Case Study', url: 'https://example.com/hawaiian-church-study' },
            { label: 'Training Materials', url: 'https://example.com/hawaiian-training' },
        ],
        fieldNotes: [],
        surveySubmissions: [],
        attribution: {
            primarySource: 'University of Hawaii',
            lastUpdated: '2024-04-05',
        },
    },
    {
        id: 'yupik-1',
        name: 'Central Alaskan Yupik',
        coordinates: [{ lat: 60.7867, lng: -161.7558 }],
        classification: {
            family: 'Eskimo-Aleut',
            branch: 'Eskimo',
            group: 'Yupik',
            isoCode: 'esu',
        },
        alternativeNames: {
            endonyms: ['Yugtun'],
            exonyms: ['Yup\'ik', 'Cup\'ik'],
            dialects: ['General Central Yupik', 'Norton Sound', 'Hooper Bay-Chevak'],
        },
        population: 10000,
        vitality: {
            percentMonolingual: 25,
            languageShiftRisk: 'Moderate',
        },
        churchPresence: 'Growing',
        links: [
            { label: 'Scripture Resources', url: 'https://example.com/yupik-scripture' },
        ],
        fieldNotes: [
            {
                id: 'fn-3',
                date: '2024-05-22',
                author: 'Michael Brown',
                content: 'Remote village visit confirmed strong language retention among elders. Youth engagement remains a challenge due to limited connectivity and educational resources.',
            },
        ],
        surveySubmissions: [],
        attribution: {
            primarySource: 'Alaska Native Language Center',
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
