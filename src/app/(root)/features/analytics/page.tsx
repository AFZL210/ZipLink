"use client"

import React from 'react';
import { Navbar } from '@/components/home/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import VideoPlayer from '@/components/ui/VideoPlayer';
import data from '@/data/common.json';

const page = () => {

  return (
    <div className='main overflow-x-hidden flex flex-col items-center justify-start' >
      <div className='fixed w-[100%] h-[4rem] navbar-bg '><Navbar /></div>
      <div className='mt-[4rem] px-4 w-[100vw] h-[calc(100vh-4rem)] flex flex-col items-center pt-20 text-'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='font-bold md:text-5xl text-4xl'>Powerful analytics for</h1><h1 className='font-bold text-4xl'>the modern marketer</h1>
          <p className='md:w-[30vw] w-[75vw] text-sm text-center mt-5'>ZipLink provides powerful analytics for your links, including geolocation, device, browser, and referrer information.</p>
        </div>

        <div className='mt-10 flex items-center justify-center gap-4'>
          <Button asChild style={{ borderRadius: "12px" }}>
            <Link href="/sign-up" className='text-sm'>Start For Free</Link>
          </Button>
          <Button onClick={() => { window.location.href = data.demo['analytics-yt'] }} className='flex items-center justify-between px-2 bg-white hover:bg-white border border-black' style={{ borderRadius: "12px" }}>
            <img src='https://img.icons8.com/fluency/48/github.png' width="32px" />
            <span className='text-black text-sm'>Watch Video</span>
          </Button>
        </div>

        <div className='md:w-[50vw] w-[70vw] mx-auto mt-10'>
          <VideoPlayer url={data.demo.analytics} width={900} height={100} />
        </div>
      </div>
    </div>
  )
}

export default page