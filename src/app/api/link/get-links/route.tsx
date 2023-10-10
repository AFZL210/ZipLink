import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db/db';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { userId } = body;

        const links = await prisma.link.findMany({
            where: {
                userId
            }
        });

        return NextResponse.json({ data: links, error: false }, { status: 200 });
    } catch (e) {
        throw new Error((e as Error).message);
    }
}