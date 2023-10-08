"use client"

import React from 'react'
import Link from 'next/link'

const NavigationItem = ({ url, title, isActive }: { url: string, title: string, isActive: boolean }) => {
    return (
        <div className={`h-[3rem] flex items-center justify-center w-fit ${isActive ? "border-b-4 border-black" : ""}`} >
            <div className='h-[2.8rem] flex items-center justify-center w-fit px-6 rounded-xl hover:bg-gray-100'>
                <Link href={url}>{title}</Link>
            </div>
        </div>
    )
}

export default NavigationItem