"use client"

import React from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'


export const Navbar = () => {

    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className='w-[100%] flex px-5 py-3 justify-between items-center'>
            <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <Image src="/static/logo.png" width="35" height="35" alt='logo' />
                <h1 className='text-xl font-[800]'>ZipLink</h1>
            </div>

            <div className='flex items-center justify-center gap-3'>
                {session && <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image style={{ borderRadius: "50%" }} src={session.user.image != null ? session.user.image : "https://avatars.githubusercontent.com/u/79896602?v=4"} width="35" height="35" alt='user' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <div>
                                    <h1 className='font-bold'>{session.user.username}</h1>
                                    <span className='font-light'>{session.user.email}</span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem style={{ cursor: 'pointer' }}>Settings</DropdownMenuItem>
                            <DropdownMenuItem style={{ cursor: 'pointer' }}>Subscription</DropdownMenuItem>
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