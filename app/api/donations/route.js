import prisma from '../../../utils/prisma';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return new Response(JSON.stringify({ error: 'No authorization header' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
    } catch (error) {
        console.error("JWT verification error:", error);
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    const body = await request.json();
    const { projectId, amount } = body;
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
        return new Response(JSON.stringify({ error: 'Invalid donation amount' }), { status: 400 });
    }

    try {
        const donation = await prisma.donation.create({
            data: {
                donorId: userId,
                projectId: parseInt(projectId),
                amount: donationAmount,
                status: 'completed',
                transactionId: 'TX' + Math.floor(Math.random() * 100000),
            },
        });

        await prisma.project.update({
            where: { id: parseInt(projectId) },
            data: { collectedBudget: { increment: donationAmount } },
        });

        return new Response(JSON.stringify(donation), { status: 201 });
    } catch (error) {
        console.error("Donation error:", error);
        return new Response(JSON.stringify({ error: 'Donation failed' }), { status: 500 });
    }
}

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const userIdParam = url.searchParams.get("userId");

        let donations;
        if (userIdParam) {
            donations = await prisma.donation.findMany({ where: { donorId: parseInt(userIdParam) } });
        } else {
            donations = await prisma.donation.findMany();
        }
        return new Response(JSON.stringify(donations), { status: 200 });
    } catch (error) {
        console.error("Error fetching donations:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch donations' }), { status: 500 });
    }
}
