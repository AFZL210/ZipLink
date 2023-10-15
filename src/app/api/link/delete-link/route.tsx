import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db/db';
import { getToken } from "next-auth/jwt";
import { headers } from 'next/headers';

export const DELETE = async (req: NextRequest) => {
    try {
        const token = await getToken({ req });

        if (token) {
            const linkId = headers().get("linkId");

            if (!linkId) {
                return NextResponse.json({ msg: "Provide a valid link ID", error: true });
            }

            await prisma.link.delete({
                where: {
                    id: linkId
                }
            });

            return NextResponse.json({ msg: "Deleted Link successfully!", error: false });
        } else {
            throw new Error("You are not authenticated!");
        }
    } catch (e) {
        throw new Error((e as Error).message);
    }
}