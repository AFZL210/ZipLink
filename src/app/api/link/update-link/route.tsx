import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/db/db';
import { getToken } from "next-auth/jwt";
import { UpdateLinkSchema } from '@/lib/types/types';

export const PATCH = async (req: NextRequest) => {
    try {
        const token = await getToken({ req });

        if (token) {
            const body = await req.json();
            let { linkId, destinationUrl, isProtected, password } = body;

            if (UpdateLinkSchema.safeParse({ linkId, destinationUrl, isProtected, password }).success) {

                await prisma.link.update({
                    where: {
                        id: linkId
                    },

                    data: {
                        url: destinationUrl,
                        isPrivate: isProtected,
                        password: password
                    }
                });

                return NextResponse.json({ data: "Updated Link Successfully!", error: false }, { status: 200 });
            } else {
                throw new Error("Data Validation failed!");
            }
        } else {
            throw new Error("You are not authenticated!");
        }
    } catch (e) {
        throw new Error((e as Error).message);
    }
}