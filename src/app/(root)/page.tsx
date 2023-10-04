"use client"

import React from 'react'
import { Navbar } from '@/components/home/Navbar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const page = () => {
  const { toast } = useToast();

  return (
    <div className='main flex items-start justify-center'>
      <Navbar />
      <Button variant="outline" onClick={() => { toast({ title: "test toast" }) }}>Click</Button>
    </div>
  )
}

export default page