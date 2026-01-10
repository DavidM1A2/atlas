import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import type { LanguageGroup } from '@/types/languageGroup';
import { parseCoordinates } from '@/utils/coordinateParser';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

export async function GET(request: NextRequest) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        return NextResponse.json(
            { error: 'Airtable configuration missing' },
            { status: 500 }
        );
    }

    // Check authentication
    const authHeader = request.headers.get('Authorization');
    let isAuthenticated = false;

    if (authHeader?.startsWith('Bearer ')) {
        const accessToken = authHeader.slice(7);
        // Gross hack, just for demo purposes
        isAuthenticated = accessToken !== null;
    }

    try {
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
        const records = await base('People_Group_Country').select().all();

        const languageGroups: LanguageGroup[] = records
            .map((record) => {
                const name = record.get('ppl_grp') as string | undefined;
                const coordinateString = record.get('Coordinates') as string | undefined;
                const population = record.get('exact_population') as number | undefined;

                if (!name) return null;

                const coordinates = parseCoordinates(coordinateString);

                // Base data always returned
                const baseData: LanguageGroup = {
                    id: record.id,
                    name,
                    coordinates,
                    country: 'Laos', // All data in this Airtable base is Laos
                };

                // Only include population for authenticated users
                if (isAuthenticated) {
                    baseData.population = population ?? 0;
                }

                return baseData;
            })
            .filter((lg): lg is LanguageGroup => lg !== null);

        return NextResponse.json({ languageGroups });
    } catch (error) {
        console.error('Failed to fetch language groups from Airtable:', error);
        return NextResponse.json(
            { error: 'Failed to fetch language groups' },
            { status: 500 }
        );
    }
}
