import prisma from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    const status = searchParams.get('statusFilter');
    const birthDateFilter = searchParams.get('birthDateFilter');
    const birthDateComparator = birthDateFilter?.substring(0, 1);
    const birthDate = birthDateFilter?.substring(1);

    const keywordWhereClause = keyword ? {
        OR: [
            { firstName: { equals: keyword, mode: Prisma.QueryMode.insensitive} },
            { middleName: { equals: keyword, mode: Prisma.QueryMode.insensitive} },
            { lastName: { equals: keyword, mode: Prisma.QueryMode.insensitive} },
            { addresses: { has: keyword}},
            { status: { equals: keyword, mode: Prisma.QueryMode.insensitive } },
            // todo: implement search by extended data fields. Need to convert to raw SQL query
        ],
      } : undefined;

    const statusWhereClause = status ? {
        status: {equals: status},
    } : undefined;

    const birthDateWhereClause = birthDateFilter ? {
        birthDate: {
            ...(birthDateComparator === "=" ? {equals: new Date(birthDate!)} : 
                birthDateComparator === ">" ? {gt: new Date(birthDate!)} :
                    {lt: new Date(birthDate!)})
        }
    } : undefined;

    const patients = await prisma.patient.findMany({
        where:  {
            AND: [
            ...(keywordWhereClause ? [keywordWhereClause] : []),
            ...(statusWhereClause ? [statusWhereClause] : []),
            ...(birthDateWhereClause ? [birthDateWhereClause]: []),
        ]}
    });

    return new Response(JSON.stringify(patients), { status: 200 });
}
