"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useRouter } from 'next/navigation'

export const Navbar = () => {

  const router = useRouter();

  return (
    <div className='w-[100%] flex px-5 py-3 justify-between items-center'>
      <div className='flex gap-2 justify-center items-center cursor-pointer'>
        <div className='flex items-center gap-2' onClick={() => window.location.href = '/'}>
          <Image src="/static/logo.png" width="35" height="35" alt='logo' />
          <h1 className='text-xl font-[800]'>ZipLink</h1>
        </div>
        <div className='hidden md:block'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <div className='w-[30rem] flex items-center justify-between flex-wrap'>
                    <div onClick={() => { router.push('/features/analytics') }} className='w-[45%] flex flex-col items-start justify-center m-3 hover:bg-slate-200 hover:rounded-[1.2rem] p-3'>
                      <div className='flex items-center gap-1'>
                        <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/analytics.png" alt="analytics" />
                        <span className='font-bold text-[.8rem]'>Advanced Analytics</span>
                      </div>
                      <div>
                        <span className='text-[.8rem]'>Powerful analytics for The...</span>
                      </div>
                    </div>
                    <div onClick={() => { router.push('/features/qr-code') }} className='w-[45%] flex flex-col items-start justify-center m-3 hover:bg-slate-200 hover:rounded-[1.2rem] p-3'>
                      <div className='flex items-center gap-1'>
                        <img width="20" height="20" src="https://img.icons8.com/pastel-glyph/64/qr-code--v2.png" alt="qr-code--v2" />
                        <span className='font-bold text-[.8rem]'>QR Codes</span>
                      </div>
                      <div>
                        <span className='text-[.8rem]'>Free QR Code Generator</span>
                      </div>
                    </div>
                    <div onClick={() => { router.push('/features/private-links') }} className='w-[45%] flex flex-col items-start justify-center m-3 hover:bg-slate-200 hover:rounded-[1.2rem] p-3'>
                      <div className='flex items-center gap-1'>
                        <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/lock.png" alt="lock" />
                        <span className='font-bold text-[.8rem]'>Private Links</span>
                      </div>
                      <div>
                        <span className='text-[.8rem]'>Create Secure Links</span>
                      </div>
                    </div>
                    <div onClick={() => { router.push('/features/timed-links') }} className='w-[45%] flex flex-col items-start justify-center m-3 hover:bg-slate-200 hover:rounded-[1.2rem] p-3'>
                      <div className='flex items-center gap-1'>
                        <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/time.png" alt="time" />
                        <span className='font-bold text-[.8rem]'>Timed Links</span>
                      </div>
                      <div>
                        <span className='text-[.8rem]'>Timed Links</span>
                      </div>
                    </div>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
        </div>

      </div>

      <div className='flex items-center justify-center gap-3'>
        <Button variant="link">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild style={{ borderRadius: "12px" }}>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}