import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/db/db';

export const GET = async (req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error("You are not authenticated");
        }

        const links = await prisma.link.findMany({
            where: {
                userId: session.user.id
            }
        });
        console.log(links)
        return NextResponse.json({ data: links, error: false }, { status: 200 });
    } catch (e) {
        throw new Error((e as Error).message);
    }
}