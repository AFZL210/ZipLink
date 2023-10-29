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
import { IDate, ILink } from '@/lib/types/types';
import { filterDates } from '@/lib/helpers';
import LineChart from '@/components/ui/LineChart';
import TooltipProviderWrapper from '@/components/ui/common/tooltip-provider';
import { copyText } from '@/lib/helpers';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const page = ({ params }: any) => {

  const { toast } = useToast();
  const router = useRouter();
  const [linkData, setLinkData] = useState<ILink>();
  const [dates, setDates] = useState<IDate[]>([]);
  const [chartDates, setChartDates] = useState<IDate[]>([]);
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
      const res = await axios.patch('/api/link/update-link', { linkId: linkData?.id, destinationUrl, password, isProtected });
      toast({ description: "Updated Link Successfully!", variant: "default" });
    } catch (e) {
      toast({ description: (e as Error).message, variant: "destructive" });
    }
  }

  useEffect(() => {
    getLink().then(data => {
      setLinkData(data.data);
      setIsProtected(data.data.isPrivate);
      setPassword(data.data.password);
      setDestinationUrl(data.data.url);
      setDates(data.data.dates);
      setChartDates(data.data.dates);
    });
  }, [])

  useEffect(() => {
    const res = filterDates(dates, filter);
    setChartDates(res);
    console.log(dates)
  }, [filter])

  if (linkData == null) {
    return <></>
  }

  return (
    <div className='w-[100vw] h-[calc(100vh - 8rem)] flex items-center justify-center overflow-x-hidden pb-6'>
      <div className='w-[90vw] h-[100%] flex flex-col mt-4'>
        <div className='w-fit px-2 py-1 rounded-full ease-in-out transition-[1.2s] flex items-center justify-start gap-2 hover:bg-gray-300 cursor-pointer'>
          <div className='rotate-180'><ArrowIcon /></div>
          <span onClick={() => router.back()}>Back to all links</span>
        </div>


        <div className='w-[100%] flex flex-col mt-10'>
          <div className='w-[90vw] flex flex-col md:flex md:flex-row justify-center md:justify-between items-center'>
            <div className='cursor-pointer flex items-center gap-2 px-2 py-1 rounded-full ease-in-out transition-[1.2s] hover:gap-4'>
              <a href={linkData.shortUrl} target='_blank' className='font-bold'>{linkData?.shortUrl?.substr(8, linkData?.shortUrl.length)}</a>
              <div><ArrowIcon /></div>
            </div>

            <div className='flex items-center gap-3'>
              <TooltipProviderWrapper tip='Copy Link'>
                <div onClick={() => {
                  copyText(linkData.shortUrl);
                  toast({ description: "Copied the link to the clipboard" });
                }}><ContentCopyIcon />
                </div>
              </TooltipProviderWrapper>

              <Select onValueChange={(value) => { setFilter(value) }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                  <SelectItem value="All Time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className='w-[100%] flex flex-col mt-5'>
          <div className='w-[100%] md:w-[60%] mx-auto h-fit bg-white boxshadow-two flex flex-col items-start p-4'>
            <div className='flex flex-col justify-center'>
              <div className='flex items-baseline gap-2'>
                <h1 className='font-bold text-5xl'>{linkData.clicks}</h1>
                <StatsIcon height='20' width='20' />
              </div>
              <h1 className='uppercase'>Total Clicks</h1>
            </div>

            <LineChart dates={chartDates} filter={filter} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page