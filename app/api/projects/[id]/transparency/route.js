import prisma from '../../../../../utils/prisma';
import jwt from 'jsonwebtoken';

export async function POST(request, { params }) {
    const { id } = await params;
    const projectId = parseInt(id, 10);

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

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { creatorId: true },
    });
    if (!project) {
        return new Response(JSON.stringify({ error: "Project not found" }), { status: 404 });
    }
    if (project.creatorId !== decoded.userId) {
        return new Response(JSON.stringify({ error: "Not authorized to add transparency comments" }), { status: 403 });
    }

    const body = await request.json();
    const { comment_en, comment_kk, imageUrl } = body;

    try {
        const transparencyComment = await prisma.transparencyComment.create({
            data: {
                projectId,
                comment_en,
                comment_kk,
                imageUrl,
            },
        });
        return new Response(JSON.stringify(transparencyComment), { status: 201 });
    } catch (error) {
        console.error("Transparency comment creation error:", error);
        return new Response(JSON.stringify({ error: "Failed to create transparency comment" }), { status: 500 });
    }
}
