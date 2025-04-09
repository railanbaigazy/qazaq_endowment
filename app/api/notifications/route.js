import prisma from '../../../utils/prisma';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return new Response(
            JSON.stringify({ error: 'Authorization header missing' }),
            { status: 401 }
        );
    }
    const token = authHeader.split(' ')[1];
    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Invalid token' }),
            { status: 401 }
        );
    }

    try {
        const notifications = await prisma.notification.findMany({
            where: { userId },
        });
        return new Response(JSON.stringify(notifications), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch notifications' }),
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return new Response(
            JSON.stringify({ error: 'Authorization header missing' }),
            { status: 401 }
        );
    }
    const token = authHeader.split(' ')[1];
    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Invalid token' }),
            { status: 401 }
        );
    }

    const body = await request.json();
    const { id } = body;
    try {
        const notification = await prisma.notification.update({
            where: { id: parseInt(id) },
            data: { read: true },
        });
        return new Response(JSON.stringify(notification), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Failed to update notification' }),
            { status: 500 }
        );
    }
}
