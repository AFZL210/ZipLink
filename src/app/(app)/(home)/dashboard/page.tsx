"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

const Dashboard = () => {
  
   const { data: session } = useSession();

  return (
    <div>Dashboard <h1>{JSON.stringify(session)}</h1></div>
  )
}

export default Dashboard