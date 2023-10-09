"use client"

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'



const CreateLinkModal = () => {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <h1>Loading...</h1>
    }

    if (status === 'unauthenticated') {
        window.location.href = '/';
    }

    const createnNewLink = () => {
        console.log('created new link');
    }

    return (
        <Dialog>
            <DialogTrigger><Button style={{ borderRadius: ".6rem" }}><div className='flex justify-center items-center gap-2'>
                <span>Create Link</span>
                <div className='px-2 py-1 bg-[#3f3f46] text-[#6d7584] rounded-xl'>C</div>
            </div>
            </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new ZipLink</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col items-start justify-center'>
                    Hii
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateLinkModal