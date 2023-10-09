"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react'
import CreateLinkModal from '@/components/ui/common/modals/CreateLinkModal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import LinkItem from '@/components/dashboard/LinkItem'
import { useToast } from '@/components/ui/use-toast';
import { useRecoilState } from 'recoil';
import { filterState } from '@/store/atoms/link';


const Dashboard = () => {

  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [links, setLinks] = useState<any>([]);
  const [filter, setFilter] = useRecoilState(filterState);
  const [search, setSearch] = useState("");

  if (status === 'loading') {
    return <h1>Loading...</h1>
  }

  if (status === 'unauthenticated') {
    window.location.href = '/';
  }

  const getLinks = async () => {
    try {
      const res = await axios.get('/api/link/get-links');

      return res.data.data;

    } catch (e) {
      await signOut();
      window.location.href = '/';
      toast({ description: `${(e as Error).message}`, variant: "destructive" });
    }
  }

  useEffect(() => {
    getLinks().then((d) => {
      setLinks(d);
    })
  }, []);

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
            <div className='max-w-[50%]'><Input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light" onClick={() => setFilter({ type: "Clicks" })}>Number of Clicks</SelectItem>
                <SelectItem value="dark" onClick={() => setFilter({ type: "Date" })}>Date Added</SelectItem>
                <SelectItem value="system" onClick={() => setFilter({ type: "LastClicked" })}>Last Clicked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className='md:w-[60%] w-[88%] h-[5.5rem]'>
        {/* <LinkItem favicon='http://www.google.com/s2/favicons?domain=www.dub.sh' clicks={4} createdAt={"4m"} shortUrl='ziplink/l/sadad' url='http://www.google.com/s2/fa?do...' /> */}
        {links.length !== 0 && <div className='w-[100%]'>
          {links.map((link: any) => (
            <div className='mt-4'><LinkItem favicon='http://www.google.com/s2/favicons?domain=www.dub.sh' clicks={link.clicks} createdAt={"20m"} shortUrl={link.shortUrl} url={link.url} />
            </div>))}
        </div>}
      </div>
    </div>
  )
}

export default Dashboard