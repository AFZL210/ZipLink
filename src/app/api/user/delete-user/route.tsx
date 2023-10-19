import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db/db';
import { getToken } from "next-auth/jwt";
import { headers } from 'next/headers';

export const DELETE = async (req: NextRequest) => {
    try {
        const token = await getToken({ req });

        if (token) {
            const userId = headers().get("userId");

            await prisma.user.delete({
                where: {
                    id: userId!
                }
            });

            const response = NextResponse.json({ erro: false, status: 200, msg: "Deleted User successfully!" });
            response.cookies.delete(process.env.COOKIE_NAME!);

            return response;
        } else {
            throw new Error("You are not authenticated!");
        }
    } catch (e) {
        throw new Error((e as Error).message);
    }
}