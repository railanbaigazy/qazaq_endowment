import prisma from '../../../../utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
        return new Response(JSON.stringify({ error: 'Missing username or password' }), { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password: _ignore, ...userData } = user;
        
        return new Response(JSON.stringify({ token, user: userData }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
    }
}
