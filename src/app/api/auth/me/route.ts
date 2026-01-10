import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/utils/sessionStore';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: 'Missing or invalid authorization header' },
            { status: 401 }
        );
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix
    const user = getSession(token);

    if (!user) {
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
        );
    }

    return NextResponse.json({ user });
}
