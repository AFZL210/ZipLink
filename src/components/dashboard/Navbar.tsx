"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/atoms/user';


export const Navbar = () => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const user = useRecoilValue(userState);

    if (status == "unauthenticated") {
        return <></>
    }

    return (
        <div className='md:w-[60%] w-[88%] flex px-5 py-3 justify-between items-center'>
            <div className='flex gap-2 justify-center items-center cursor-pointer' onClick={() => window.location.href = '/'}>
                <Image src="/static/logo.png" width="35" height="35" alt='logo' />
                <h1 className='text-xl font-[800]'>ZipLink</h1>
            </div>

            <div className='flex items-center justify-center gap-3'>
                {session && <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image style={{ borderRadius: "50%" }} src={user.image ? user.image : ""} width="35" height="35" alt='user' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <div>
                                    <h1 className='font-bold'>{user.username}</h1>
                                    <span className='font-light'>{user.email}</span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem style={{ cursor: 'pointer' }} onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
                            <DropdownMenuItem style={{ cursor: 'pointer' }} onClick={async () => {
                                await signOut();
                                window.location.href = '/';
                            }}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>}
            </div>
        </div>
    )
}