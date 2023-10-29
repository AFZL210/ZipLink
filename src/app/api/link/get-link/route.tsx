import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db/db';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        let { urlCode, checkPassword, password, date } = body;

        date = new Date(date.split('T')[0]);

        const link = await prisma.link.findFirst({
            where: {
                urlCode: urlCode
            },
            include: {
                dates: {
                    select: {
                        date: true,
                        clicks: true
                    }
                }
            }
        })

        if (checkPassword) {
            const matchPassword = bcrypt.compareSync(password, link?.password!);

            if (!matchPassword) {
                return NextResponse.json({ data: null, error: true, msg: "Wrong Password!" }, { status: 403 });
            }
        }

        await prisma.link.update({
            where: { id: link?.id },
            data: {
                clicks: { increment: 1 },
                lastClick: new Date(),
                dates: {
                    upsert: {
                        where: { date: date },
                        create: { clicks: 1, date: date },
                        update: { clicks: { increment: 1 } }
                    }
                }
            }
        });
        return NextResponse.json({ data: link, error: false }, { status: 200 });
    } catch (e) {
        throw new Error((e as Error).message);
    }
}