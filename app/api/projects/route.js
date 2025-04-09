import prisma from '../../../utils/prisma';
import jwt from 'jsonwebtoken';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: {
                updates: true,
                creator: { select: { username: true } },
            },
        });
        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), { status: 500 });
    }
}

export async function POST(request) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
        return new Response(JSON.stringify({ error: "Authorization header missing" }), { status: 401 });
    }
    
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("JWT verification failed:", error);
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    if (!(decoded.role === "institution" || decoded.role === "admin")) {
        return new Response(JSON.stringify({ error: "Only institutions or admins can create projects" }), { status: 403 });
    }

    const body = await request.json();
    const { title_en, title_kk, description_en, description_kk, targetBudget, imageUrl } = body;
    try {
        const project = await prisma.project.create({
            data: {
                title_en,
                title_kk,
                description_en,
                description_kk,
                targetBudget: parseFloat(targetBudget),  // new field
                imageUrl,
                isApproved: false,
                creatorId: decoded.userId,  // record the creator's id
            },
        });
        return new Response(JSON.stringify(project), { status: 201 });
    } catch (error) {
        console.error("Project creation error:", error);
        return new Response(JSON.stringify({ error: "Failed to create project" }), { status: 500 });
    }
}
