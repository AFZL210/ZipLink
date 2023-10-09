"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const page = ({ params }: any) => {

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [destinationUrl, setDestinationUrl] = useState("");
  

  const redirectURL = (url: string) => {
    window.location.href = url;
  }

  const getLink = async () => {
    try {
      console.log(params.urlCode)
    const res = await axios.post('/api/link/get-link/', { urlCode: params.urlCode });
    console.log(res.data)
    return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getLink().then(d => redirectURL(d.data.url));
  }, [])

  return (
    <div className='w-[100vw] h-[100vw]'>
      {loading?<div>redirecting...</div>:<div>opening ${destinationUrl}</div>}
    </div>
  )
}

export default page