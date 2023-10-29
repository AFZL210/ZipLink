import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db/db';
import { headers } from 'next/headers';

export const GET = async (req: NextRequest) => {
    try {
        const urlCode = headers().get("urlCode");

        const link = await prisma.link.findFirst({
            where: {
                urlCode: urlCode!
            },
            include: {
                dates: {
                    select: {
                        date: true,
                        clicks: true
                    }
                }
            }
        });

        return NextResponse.json({ data: link, error: false }, { status: 200 });
    } catch (e) {
        throw new Error((e as Error).message);
    }
}