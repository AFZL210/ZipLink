"use client"

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import CreateLinkModal from '@/components/dashboard/CreateLinkModal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import LinkItem from '@/components/dashboard/LinkItem'



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
    <div className='w-[100vw] h-[80vh] overflow-x-hidden flex flex-col items-center justify-start'>
      <div className='w-[100%] flex items-center justify-center'>
        <div className='w-[100%] bg-white flex items-center justify-center py-10'>
          <div className='md:w-[60%] w-[88%] flex px-5 py-3 justify-between items-center mt-4'>
            <h1 className='text-3xl'>My Links</h1>
            <CreateLinkModal />
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
      <div className='md:w-[80vw] w-[90vw]  h-[5.5rem]'>
        <LinkItem />
      </div>
    </div>
  )
}

export default Dashboard