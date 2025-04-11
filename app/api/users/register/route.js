import prisma from '../../../../utils/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    const body = await request.json();
    const { username, email, password, role } = body;

    if (!username || !email || !password || !role) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    if (typeof username !== 'string' || username.trim().length < 3) {
        return new Response(JSON.stringify({ error: 'Username must be at least 3 characters long' }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400 });
    }

    if (typeof password !== 'string' || password.length < 6) {
        return new Response(JSON.stringify({ error: 'Password must be at least 6 characters long' }), { status: 400 });
    }

    const allowedRoles = ['donor', 'institution'];
    if (!allowedRoles.includes(role)) {
        return new Response(JSON.stringify({ error: 'Invalid role provided' }), { status: 400 });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword, role },
        });

        const { password: _ignored, ...userData } = user;
        return new Response(JSON.stringify(userData), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
    }
}
