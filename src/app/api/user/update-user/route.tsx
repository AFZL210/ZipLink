import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/db/db';
import { getToken } from "next-auth/jwt";
import { headers } from 'next/headers';

export const PUT = async (req: NextRequest) => {
    try {
        const token = await getToken({ req });

        if (token) {
            const userId = headers().get("userId");
            const username = headers().get("username");

            await prisma.user.update({
                where: {
                    id: userId!
                },
                data: {
                    username: username!
                }
            })

            const response = NextResponse.json({ error: false, status: 200, msg: "Updated username successfully!" });
            
            return response;
        } else {
            throw new Error("You are not authenticated!");
        }
    } catch (e) {
        throw new Error((e as Error).message);
    }
}