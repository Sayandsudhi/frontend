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
        const { serviceType, pickupLocation, dropoffLocation, scheduledTime } = await request.json();

        const booking = await prisma.booking.create({
            data: {
                patientId: userId,
                serviceType,
                pickupLocation,
                dropoffLocation,
                scheduledTime: scheduledTime ? new Date(scheduledTime) : null,
                status: serviceType === 'EMERGENCY' ? 'URGENT_DISPATCH' : 'PENDING'
            },
        });

        return NextResponse.json(booking);
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const userId = await getUserFromToken(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const bookings = await prisma.booking.findMany({
            where: { patientId: userId },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Booking fetch error:', error);
        return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
    }
}
