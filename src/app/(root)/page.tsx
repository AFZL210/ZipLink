"use client"

import React from 'react'
import { Navbar } from '@/components/home/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {

  return (
    <div className='main overflow-x-hidden flex flex-col items-center justify-start' >
      <div className='fixed w-[100%] h-[4rem] navbar-bg '><Navbar /></div>
      <div className='mt-[4rem] px-4 w-[100vw] h-[calc(100vh-4rem)] flex flex-col items-center pt-20'>
        <div className='flex flex-col items-center justify-center md:text-6xl text-4xl'>
          <h1 className='font-bold'>Short Links With</h1><h1 className='gradient-one font-bold'>Big Impact</h1>
          <p className='md:w-[30vw] w-[75vw] text-sm text-center mt-5'>ZipLink is a feature-rich link management tool. facilitating seamless short link creation, sharing, and tracking</p>
        </div>

        <div className='mt-10'>
          <Button asChild style={{ borderRadius: "12px" }}>
            <Link href="/sign-up">Start For Free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page