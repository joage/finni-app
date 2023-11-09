import prisma from "../../../../lib/prisma";

export async function GET(request: Request): Promise<Response> {
    const patients = await prisma.patient.findMany({
        // where: { },
        include: {
          clinic: {
            select: { name: true },
          },
        },
      });

    return new Response(JSON.stringify(patients), { status: 200 });
}
