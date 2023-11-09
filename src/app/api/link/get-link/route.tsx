import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db/db';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        let { urlCode, checkPassword, password, date, osType, deviceType } = body;

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

        const res = await prisma.link.update({
            where: { id: link?.id },
            data: {
                clicks: { increment: 1 },
                lastClick: new Date(),
            },
            include: {
                dates: { select: { id: true, date: true } },
                os: { select: { id: true, os: true } },
                device: { select: { id: true, device: true } }
            }
        });

        const checkDate = res.dates.findIndex((e) => e.date?.toISOString().split('T')[0] == date.toISOString().split('T')[0]);

        if (checkDate == -1) {
            await prisma.linkDate.create({
                data: {
                    date: date,
                    clicks: 1,
                    link: {
                        connect: {
                            id: link?.id
                        }
                    }
                },
            })
        } else {
            await prisma.linkDate.update({
                where: { id: res.dates[checkDate].id },
                data: { clicks: { increment: 1 } }
            })
        }

        const osCheck = res.os.findIndex((e) => e.os == osType);
        const deviceCheck = res.device.findIndex((e) => e.device == deviceType);

        if (osCheck == -1) {
            await prisma.oSType.create({
                data: {
                    os: osType,
                    clicks: 1,
                    link: {
                        connect: {
                            id: link?.id
                        }
                    }
                },
            })
        } else {
            await prisma.oSType.update({
                where: { id: res.os[osCheck].id },
                data: { clicks: { increment: 1 } }
            })
        }

        if (deviceCheck == -1) {
            await prisma.deviceType.create({
                data: {
                    device: deviceType,
                    clicks: 1,
                    link: {
                        connect: {
                            id: link?.id
                        }
                    }
                },
            })
        } else {
            await prisma.oSType.update({
                where: { id: res.device[deviceCheck].id },
                data: { clicks: { increment: 1 } }
            })
        }

        return NextResponse.json({ data: link, error: false }, { status: 200 });
    } catch (e) {
        throw new Error((e as Error).message);
    }
}