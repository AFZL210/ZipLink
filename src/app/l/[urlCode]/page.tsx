"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { detectDeviceAndOS } from '@/lib/helpers';

const GetLink = ({ params }: any) => {

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [destinationUrl, setDestinationUrl] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState({ error: false, msg: "" });

  const redirectURL = (url: string) => {
    if (typeof window !== 'undefined') {
      window.location.replace(url)
    }
  }

  const getLink = async (deviceInfo: string[]) => {
    try {
      const res = await axios.post('/api/link/get-link/', { urlCode: params.urlCode, checkPassword: false, password: "", date: new Date().toISOString(), osType: deviceInfo[0], deviceType: deviceInfo[1] });
      return res.data;
    } catch (e) {
      console.log("Something went wrong.");
    }
  }

  const unlockLink = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/link/get-link/', { urlCode: params.urlCode, checkPassword: true, password });
      setError({ ...error, error: false });
      setIsPrivate(false);
      redirectURL(res.data.data.url);

    } catch (e) {
      setError({ error: true, msg: "Wrong password!" });
    }
  }

  useEffect(() => {

    let deviceInfo: string[] = [];

    if (typeof window !== 'undefined') {
      deviceInfo = detectDeviceAndOS();
    }

    getLink(deviceInfo).then((d) => {
      if (!d?.data?.isPrivate) {
        redirectURL(d.data.url)
      } else {
        setIsPrivate(true);
      }
    });
  }, [])

  return (
    <div className='w-[100vw] h-[100vh]'>
      <a href={destinationUrl} className='hidden'></a>
      {!isPrivate ? <div>{loading ? <span>redirecting...</span> : <span>{`opening ${destinationUrl}`}</span>}</div> :
        <div className='w-[100%] h-[100%] flex items-center justify-center'>
          <div className='flex flex-col gap-2'>
            <form onSubmit={unlockLink}>
              {error.error && <span className='text-red-600'>{error.msg}</span>}
              <Label>Enter Link Password</Label>
              <Input type="text" placeholder="mysecret" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" style={{ marginTop: "10px", marginBottom: "10px" }}>Unlock</Button>
            </form>
          </div>
        </div>}
    </div>
  )
}

export default GetLink