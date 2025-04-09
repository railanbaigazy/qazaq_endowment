import prisma from '../../../../utils/prisma';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                collectedBudget: 'desc'
            },
            take: 3,
            include: {
                updates: true,
                creator: { select: { username: true } },
            },
        });
        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch featured projects' }), { status: 500 });
    }
}
