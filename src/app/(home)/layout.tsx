"use client"

import { Navbar } from "@/components/dashboard/Navbar";
import NavigationItem from "@/components/dashboard/NavigationItem";
import React, { useEffect, useState } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-[100vw]">
            <div className='fixed w-[100%] h-[4rem] flex items-center justify-center navbar-bg mb-[4rem]'><Navbar /></div>
            <div className='w-[100vw] h-[3rem] border-b-2 border-black border-opacity-20 flex items-center justify-start relative top-[4rem] px-[8%]'>
                <div className='md:w-[60%] h-[100%] w-[100%] flex md:px-64 px-0 py-3 justify-start gap-3 items-center'>
                    <NavigationItem url='/dashboard' title='Links' isActive={true} />
                    <NavigationItem url='/settings' title='Settings' isActive={false} />
                </div>
            </div>
            <div className="relative top-[4rem] min-h-[calc(100vh-8rem)] w-[100vw] bg-[#f9fafb]">
                {children}
            </div>
        </div>
    )
}

export default HomeLayout;