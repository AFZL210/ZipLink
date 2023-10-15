import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/db/db';
import { getToken } from "next-auth/jwt";

export const POST = async (req: NextRequest) => {
    try {
        const token = await getToken({ req });

        if (token) {
            const body = await req.json();
            console.log(body.userId);
            const { userId } = body;

            const links = await prisma.link.findMany({
                where: {
                    userId
                }
            });

            return NextResponse.json({ data: links, error: false }, { status: 200 });
        } else {
            throw new Error("You are not authenticated!");
        }
    } catch (e) {
        throw new Error((e as Error).message);
    }
}