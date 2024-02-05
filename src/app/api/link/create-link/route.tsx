import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/db/db';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '@/lib/contants';
import { getToken } from "next-auth/jwt";

const createShortUrlCode = async () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = characters.length;
    let shortUrlCode = "";

    while (true) {
        const randomChars = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * length)));
        const temp = randomChars.join('');

        const res = await prisma.link.findMany({
            where: {
                urlCode: temp
            }
        });

        if (res.length === 0) {
            shortUrlCode = temp;
            break;
        }
    }

    return shortUrlCode;
};

export const POST = async (req: NextRequest) => {
    try {
        const token = await getToken({ req });

        if (token) {
            const body = await req.json();
            const session = await getServerSession(authOptions);
            const DOMAIN = process.env.DOMAIN;

            if (!session) {
                throw new Error("You are not authenticated");
            }

            const { destinationUrl, isProtected, password } = body;
            const shortUrlCode = await createShortUrlCode();
            let hashedPassword = "";
            if (isProtected) {
                hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
            }

            const newLink = await prisma.link.create({
                data: {
                    url: `${destinationUrl}`,
                    urlCode: shortUrlCode,
                    isPrivate: isProtected,
                    password: isProtected ? hashedPassword : "",
                    shortUrl: `${DOMAIN}/l/${shortUrlCode}`,

                    user: {
                        connect: {
                            id: session.user.id
                        }
                    }
                }
            });

            return NextResponse.json({ data: newLink, error: false }, { status: 200 });
        } else {
            throw new Error("You are not authenticated!");
        }
    } catch (e) {
        throw new Error("Error creating new link");
    }
}