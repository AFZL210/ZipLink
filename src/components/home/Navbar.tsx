import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export const Navbar = () => {

  return (
    <div className='w-[100%] flex px-5 py-3 justify-between items-center'>
      <div className='flex gap-2 justify-center items-center cursor-pointer'>
        <Image src="/static/logo.png" width="35" height="35" alt='logo' />
        <h1 className='text-xl font-[800]'>ZipLink</h1>
      </div>

      <div className='flex items-center justify-center gap-3'>
        <Button variant="link">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild style={{ borderRadius: "12px" }}>
          <Link href="/sign-up">Sig Up</Link>
        </Button>
      </div>
    </div>
  )
}