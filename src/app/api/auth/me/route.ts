import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: 'Missing or invalid authorization header' },
            { status: 401 }
        );
    }

    const accessToken = authHeader.slice(7); // Remove 'Bearer ' prefix
    return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
    );
}
