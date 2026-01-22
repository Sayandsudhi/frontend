import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/db';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey123';

export async function GET(request: Request) {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { patientProfile: true },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: `Welcome back, ${user.email}!`,
            user: { id: user.id, email: user.email, profile: user.patientProfile }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }
}
