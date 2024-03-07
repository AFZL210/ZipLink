"use client"

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import CreateLinkModal from '@/components/ui/common/modals/CreateLinkModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import LinkItem from '@/components/dashboard/LinkItem';
import { useToast } from '@/components/ui/use-toast';
import { useRecoilState } from 'recoil';
import { filterState } from '@/store/atoms/filter';
import { LinksState } from '@/store/atoms/link';
import Loader from '@/components/ui/common/Loader';
import type { ILink } from '@/lib/types/types';
import { sortLinks } from '@/lib/helpers';

const Dashboard = () => {

  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [filter, setFilter] = useRecoilState(filterState);
  const [search, setSearch] = useState("");
  const [linksState, setLinksState] = useRecoilState(LinksState);
  const [flag, setFlag] = useState(false);

  const getLinks = async (): Promise<ILink[] | undefined> => {
    try {
      const res = await axios.post('/api/link/get-links', { userId: session?.user.id });
      return res.data.data;

    } catch (e) {
      await signOut();
      toast({ description: 'Something went wrong!', variant: "destructive" });
      window.location.href = '/';
    }
  }

  useEffect(() => {
    getLinks().then((d) => {
      setLinksState({ loading: false, links: d == undefined ? [] : sortLinks(d, filter) });
    });
  }, [filter])

  if (status === 'unauthenticated') {
    toast({ description: "You are not authenticated!", variant: "destructive" });
    window.location.href = '/';
  }

  if (status == 'authenticated' && !flag) {
    setFlag(true);
    getLinks().then((d) => {
      setLinksState({ loading: false, links: d == undefined ? [] : sortLinks(d, "clicks") });
    });
  }

  return (
    <div className='w-[100vw] h-[80vh] overflow-x-hidden flex flex-col items-center justify-start'>
      {
        linksState.loading || status == 'loading' ?
          <div className='w-[100vw] h-[calc(100vh-8rem)] flex items-center justify-center'>
            <Loader />
          </div>

          :

          <div className='w-[100vw] h-[100%] overflow-x-hidden flex flex-col items-center justify-start'>
            <div className='w-[100%] flex items-center justify-center'>
              <div className='w-[100%] bg-white flex items-center justify-center py-10'>
                <div className='md:w-[60%] w-[88%] flex px-5 py-3 justify-between items-center mt-4'>
                  <h1 className='text-3xl'>My Links</h1>
                  <CreateLinkModal getLinks={getLinks} />
                </div>
              </div>
            </div>
            <div className='w-[100%] flex items-center justify-center'>
              <div className='md:w-[60%] w-[88%] flex px-5 py-3 justify-between items-center mt-1'>
                <div className='w-[100%] flex justify-start items-center gap-4'>
                  <div className='max-w-[50%]'><Input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
                  <Select onValueChange={(value) => { setFilter(value) }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clicks">Number of Clicks</SelectItem>
                      <SelectItem value="date-added">Date Added</SelectItem>
                      <SelectItem value="last-clicked">Last Clicked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className='md:w-[60%] w-[88%] h-[5.5rem]'>
              {linksState.links.length == 0 && <h1 className='text-center'>Create your first ZipLink!</h1>}
              {linksState.links && linksState.links.length !== 0 && <div className='w-[100%]'>
                {linksState.links.map((link: ILink) => (
                  <div className='mt-4 w-[100%]'><LinkItem urlCode={link.urlCode} isProtected={link.isPrivate} password={link.password} id={link.id} getLinks={getLinks} favicon={`http://www.google.com/s2/favicons?domain=${link.url}`} clicks={link.clicks} createdAt={"20m"} shortUrl={link.shortUrl} url={link.url} />
                  </div>))}
              </div>}
            </div>
          </div>
      }
    </div>
  )
}

export default Dashboard