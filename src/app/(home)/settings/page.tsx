"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

const Settings = () => {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <h1>Loading...</h1>
    }

    if (status === 'unauthenticated') {
        window.location.href = '/';
    }

    return (
        <div className='w-[100vw] h-[100%] overflow-x-hidden flex flex-col items-center justify-start'>
            <div className='w-[100%] flex items-center justify-center'>
                <div className='w-[100%] bg-white flex items-center justify-center py-10'>
                    <div className='md:w-[60%] w-[88%] flex px-5 py-3 justify-between items-center mt-4'>
                        <h1 className='text-3xl'>Settings</h1>
                    </div>
                </div>
            </div>
            <div className='w-[100%] flex items-center justify-center'>
                Hi
            </div>
        </div>
    )
}

export default Settings