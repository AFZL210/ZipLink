"use client"

import React from 'react';
import { Navbar } from '@/components/home/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const page = () => {

  return (
    <div className='main overflow-x-hidden flex flex-col items-center justify-start' >
      <div className='fixed w-[100%] h-[4rem] navbar-bg '><Navbar /></div>
      <div className='mt-[4rem] px-4 w-[100vw] h-[calc(100vh-4rem)] flex flex-col items-center pt-20 text-'>
        <h1>Coming Soon...</h1>
      </div>
    </div>
  )
}

export default page