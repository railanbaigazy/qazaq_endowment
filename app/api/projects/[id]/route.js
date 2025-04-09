import prisma from '../../../../utils/prisma';

export async function GET(request, { params }) {
    const { id } = await params;
    const projectId = parseInt(id, 10);

    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                updates: true,
                transparencyComments: true,
                creator: { select: { username: true } },
            },
        });

        if (!project) {
            return new Response(JSON.stringify({ error: "Project not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(project), { status: 200 });
    } catch (error) {
        console.error("Error fetching project:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch project" }), { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const projectId = parseInt(params.id);
    const body = await request.json();
    const { title_en, title_kk, description_en, description_kk, transparency_en, transparency_kk, imageUrl, isApproved } = body;
    try {
        const project = await prisma.project.update({
            where: { id: projectId },
            data: { title_en, title_kk, description_en, description_kk, transparency_en, transparency_kk, imageUrl, isApproved },
        });
        return new Response(JSON.stringify(project), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to update project' }), { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const projectId = parseInt(params.id);
    try {
        await prisma.project.delete({ where: { id: projectId } });
        return new Response(JSON.stringify({ message: 'Project deleted' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to delete project' }), { status: 500 });
    }
}
