"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowIcon from '@/components/ui/common/ArrowIcon';
import StatsIcon from '@/components/ui/common/StatsIcon';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ILink } from '@/lib/types/types';

const page = ({ params }: any) => {

  const { toast } = useToast();
  const router = useRouter();
  const [linkData, setLinkData] = useState<ILink>();
  const [dates, setDates] = useState(new Array(12).fill(0));
  const [password, setPassword] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [filter, setFilter] = useState("All Time");

  const getLink = async () => {
    try {
      const res = await axios.get('/api/link/link-data/', { headers: { urlCode: params.linkId } });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  const updateLink = async (e: any) => {
    e.preventDefault();

    if (isProtected && password == "") {
      toast({ description: "Password Cannot be empty", variant: "destructive" });
      return;
    }

    if (destinationUrl == "") {
      toast({ description: "URL Cannot be empty", variant: "destructive" });
      return;
    }

    try {
      // @ts-ignore
      const res = await axios.patch('/api/link/update-link', { linkId: linkData.id, destinationUrl, password, isProtected });
      toast({ description: "Updated Link Successfully!", variant: "default" });
    } catch (e) {
      toast({ description: (e as Error).message, variant: "destructive" });
    }
  }

  useEffect(() => {
    getLink().then(data => {
      setLinkData(data.data);
      console.log(data.data.isPrivate)
      setIsProtected(data.data.isPrivate);
      setPassword(data.data.password);
      setDestinationUrl(data.data.url);
    })
  }, [])

  if (linkData == null) {
    return <></>
  }

  return (
    <div className='w-[100vw] h-[calc(100vh - 8rem)] flex items-center justify-center overflow-x-hidden'>
      <div className='w-[90vw] h-[100%] flex flex-col mt-4'>
        <div className='w-fit px-2 py-1 rounded-full ease-in-out transition-[1.2s] flex items-center justify-start gap-2 hover:bg-gray-300 cursor-pointer'>
          <div className='rotate-180'><ArrowIcon /></div>
          <span onClick={() => router.back()}>Back to all links</span>
        </div>


        <div className='w-[100%] flex flex-col mt-10'>
          <div className='w-[90vw] flex flex-col md:flex md:flex-row justify-center md:justify-between items-center'>
            <div className='cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full ease-in-out transition-[1.2s] hover:gap-4'>
              <a href={linkData.shortUrl} target='_blank' className='font-bold'>{linkData.shortUrl.substr(8, linkData.shortUrl.length)}</a>
              <div><ArrowIcon /></div>
            </div>
            <Select onValueChange={(value) => { setFilter(value) }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clicks">Today</SelectItem>
                <SelectItem value="date-added">Last 30 Days</SelectItem>
                <SelectItem value="last-clicked">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page