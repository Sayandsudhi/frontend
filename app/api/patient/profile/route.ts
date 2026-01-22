import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/db';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey123';

async function getUserFromToken(request: Request) {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return null;
    try {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        return decoded.userId;
    } catch (err) {
        return null;
    }
}

export async function POST(request: Request) {
    const userId = await getUserFromToken(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { fullName, emergencyContact, homeAddress, medicalConditions, mobilityNeeds } = await request.json();

        const profile = await prisma.patientProfile.upsert({
            where: { userId },
            update: { fullName, emergencyContact, homeAddress, medicalConditions, mobilityNeeds },
            create: {
                userId,
                fullName,
                emergencyContact,
                homeAddress,
                medicalConditions,
                mobilityNeeds
            },
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Profile error:', error);
        return NextResponse.json({ error: 'Error saving profile' }, { status: 500 });
    }
}
