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



const Dashboard = () => {

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
    <div className='w-[100vw] h-[100%] overflow-x-hidden flex flex-col items-center justify-start'>
      <div className='w-[100%] flex items-center justify-center'>
        <div className='w-[100%] bg-white flex items-center justify-center py-10'>
          <div className='md:w-[60%] w-[88%] flex px-5 py-3 justify-between items-center mt-4'>
            <h1 className='text-3xl'>My Links</h1>
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
          </div>
        </div>
      </div>
      <div className='w-[100%] flex items-center justify-center'>
        <div className='md:w-[60%] w-[88%] flex px-5 py-3 justify-between items-center mt-1'>
          <div className='w-[100%] flex justify-start items-center gap-4'>
            <div className='max-w-[50%]'><Input type="text" placeholder="Search" /></div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Number of Clicks</SelectItem>
                <SelectItem value="dark">Date Added</SelectItem>
                <SelectItem value="system">Last Clicked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard