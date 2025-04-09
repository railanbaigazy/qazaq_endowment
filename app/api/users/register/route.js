import prisma from '../../../../utils/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    const body = await request.json();
    const { username, email, password, role } = body;
    if (!username || !email || !password || !role) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
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
