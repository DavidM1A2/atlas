import { NextRequest, NextResponse } from 'next/server';
import { testUsers } from '@/data/users';
import { createSession } from '@/utils/sessionStore';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        const matchedUser = testUsers.find(
            (u) => u.username === username && u.password === password
        );

        if (!matchedUser) {
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            );
        }

        const user = {
            username: matchedUser.username,
            role: matchedUser.role,
            assignedCountries: matchedUser.assignedCountries,
        };

        const token = createSession(user);

        // Response mimics Cognito's token response structure
        return NextResponse.json({
            accessToken: token,
            user,
        });
    } catch {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
