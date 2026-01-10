import { NextResponse } from 'next/server';
import Airtable from 'airtable';
import type { LanguageGroup } from '@/types/languageGroup';
import { parseCoordinates } from '@/utils/coordinateParser';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

export async function GET() {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        return NextResponse.json(
            { error: 'Airtable configuration missing' },
            { status: 500 }
        );
    }

    try {
        const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
        const records = await base('People_Group_Country').select().all();

        const languageGroups: LanguageGroup[] = records
            .map((record) => {
                const name = record.get('ppl_grp') as string | undefined;
                const coordinateString = record.get('Coordinates') as string | undefined;

                if (!name) return null;

                const coordinates = parseCoordinates(coordinateString);

                if (coordinates.length === 0) {
                    if (!coordinateString || !coordinateString.trim()) {
                        console.warn(`[${record.id}] "${name}": No coordinates provided`);
                    } else {
                        console.warn(`[${record.id}] "${name}": Failed to parse coordinates: "${coordinateString}"`);
                    }
                }

                return {
                    id: record.id,
                    name,
                    coordinates,
                };
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
