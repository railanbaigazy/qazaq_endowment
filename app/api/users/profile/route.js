import prisma from '../../../../utils/prisma';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Authorization header missing' }), { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return new Response(JSON.stringify({ error: 'Token missing' }), { status: 401 });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, username: true, email: true, role: true },
        });
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }
}
