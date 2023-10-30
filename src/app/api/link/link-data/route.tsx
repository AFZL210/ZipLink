import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db/db';
import { headers } from 'next/headers';

export const GET = async (req: NextRequest) => {
    const urlCode = headers().get("urlCode");

    try {
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
                },
                os: {
                    select: {
                        clicks: true,
                        os: true
                    }
                },
                device: {
                    select: {
                        clicks: true,
                        device: true
                    }
                }
            }
        });

        return NextResponse.json({ data: link, error: false }, { status: 200 });
    } catch (e) {
        throw new Error((e as Error).message);
    }
}