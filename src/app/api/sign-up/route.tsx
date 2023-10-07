import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignupFormSchema } from '@/lib/types';
import { prisma } from '@/db/db';
import { BCRYPT_SALT_ROUNDS } from '@/lib/contants';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        const validateData = SignupFormSchema.safeParse({ username, email, password });

        if (!validateData.success) {
            throw new Error("Validation failed");
        }

        const checkUserWithUsername = await prisma.user.findMany({
            where: { username }
        });

        if (checkUserWithUsername.length != 0) {
            throw new Error("Username already exists");
        }

        const checkUserWithEmail = await prisma.user.findUnique({
            where: { email }
        });

        if (checkUserWithEmail) {
            throw new Error("Email already exists");
        }

        const hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({ msg: "Created account successfully", error: false, data: { username, email } }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ msg: (e as Error).message }, { status: 500 });
    }
}