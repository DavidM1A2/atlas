import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/utils/sessionStore';

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: 'Missing or invalid authorization header' },
            { status: 401 }
        );
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix
    deleteSession(token);

    return NextResponse.json({ success: true });
}
