import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db/db';
import { headers } from 'next/headers'

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { urlCode } = body;
        console.log(urlCode)
        const link = await prisma.link.findFirst({
            where: {
                urlCode: urlCode
            }
        });
        console.log(link)
        return NextResponse.json({ data: link }, { status: 200 });
    } catch (e) {
        throw new Error((e as Error).message);
    }
}